import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { BASE_URL } from '../../../nc'
import {
  CCPayment,
  CreateCardResponse,
  CreateTradeResponse,
  PaymentMethodForm,
  PurchaseDetail,
} from '../../../types/typings'
import { prisma } from '../../../lib/db'
import {
  CREDIT_CARD_TXN_LIMIT,
  TRANSACTION_CREATED_STATUS,
} from '../../../constants/const'
import { mapPaymentMethodtoTransactionType } from '../../../utils/mappers'
import { isCCValid } from '../../../utils/utils'

export default async function handleNorthCapital(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'Session not found.' })
  }
  console.log('Session located.')

  const V3_URL = '/tapiv3/index.php/v3'

  if (!BASE_URL) {
    console.log('North Capital URL not loaded.')
    return res.status(500).json({ message: 'No NC URL found.' })
  }

  const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID
  const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY

  if (!CLIENT_ID || !DEVELOPER_KEY) {
    console.log('North Capital parameters not loaded.')
    return res.status(500).json({ message: 'No NC parameters found.' })
  }

  const paymentForm = req.body as PaymentMethodForm
  if (!paymentForm) {
    return res
      .status(500)
      .json({ message: 'Data for submission not received.' })
  }
  console.log('Received', paymentForm)

  // verify offering submitted
  const offering = await prisma.offering.findUnique({
    where: {
      slug: paymentForm.offeringSlug,
    },
  })

  // verify profile submitted
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId: session.user.uid,
    },
  })

  if (!offering) {
    return res.status(404).json({ message: 'No offering found' })
  }

  if (!profile) {
    return res.status(404).json({ message: 'No profile found' })
  }

  if (!offering.pricePerUnit) {
    return res.status(404).json({ message: 'Error with pricing info' })
  }
  const numberOfUnits =
    (paymentForm.transactionAmount * 100) / offering.pricePerUnit

  const createTradeURL = new URL(
    'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createTrade'
  )
  const data = new URLSearchParams()
  data.append('clientID', CLIENT_ID)
  data.append('developerAPIKey', DEVELOPER_KEY)
  data.append('offeringId', offering.ncOfferingId!)
  data.append('accountId', profile.ncAccountId!)
  data.append(
    'transactionType',
    mapPaymentMethodtoTransactionType(paymentForm.paymentMethod)
  )
  data.append('transactionUnits', numberOfUnits.toString())
  data.append('createdIpAddress', '127.0.0.1')

  const response = await fetch(createTradeURL, {
    method: 'PUT',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    console.log(response)
    return res
      .status(500)
      .json({ message: `Error creating trade! status: ${response.status}` })
  }

  const result = (await response.json()) as CreateTradeResponse

  if (result.statusCode == '101') {
    const tradeId = getTradeIdFromCreateTradeResponse(result)
    if (!tradeId) {
      return res.status(500).json({ message: 'No trade ID was found.' })
    }

    const transaction = await prisma.transaction.create({
      data: {
        userProfileId: session.user.uid! as string,
        ncTradeId: tradeId,
        offeringId: offering.id,
        transactionType: paymentForm.paymentMethod,
        transactionUnits: numberOfUnits,
        status: TRANSACTION_CREATED_STATUS,
        totalAmount: paymentForm.transactionAmount * 100, // save amount in cents
      },
    })

    if (!transaction) {
      return res
        .status(500)
        .json({ message: 'Error creating transaction in ChainRaise database' })
    }
  } else {
    return res.status(500).json({ message: 'error: ' + result.statusDesc })
  }

  if (paymentForm.paymentMethod == 'cc') {
    if (paymentForm.transactionAmount > CREDIT_CARD_TXN_LIMIT) {
      return res
        .status(500)
        .json({
          message:
            'Transaction amount exceeds credit card limit amount. Please use ACH or Wire',
        })
    }
    if (!isCCValid(paymentForm.cc)) {
      return res.status(500).json({ message: 'Invalid credit card submitted.' })
    }

    // add credit card
    const addCreditCardURL = new URL(
      'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/addCreditCard'
    )

    let ownerName = paymentForm!.cc!.ownerName
    let cardNumber = paymentForm!.cc!.cardNumber
    let expirationDate = paymentForm!.cc!.expirationDate
    let cardType = paymentForm!.cc!.cardType
    let cvvNumber = paymentForm!.cc!.cvvNumber

    const data = new URLSearchParams()
    data.append('clientID', CLIENT_ID)
    data.append('developerAPIKey', DEVELOPER_KEY)
    data.append('accountId', profile.ncAccountId!)
    data.append('creditCardName', ownerName)
    data.append('creditCardNumber', cardNumber.toString())
    data.append('expirationDate', expirationDate)
    data.append('cvvNumber', cvvNumber.toString())
    data.append('cardType', cardType)
    data.append('createdIpAddress', '127.0.0.1')

    const response = await fetch(addCreditCardURL, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      console.log(response)
      return res
        .status(500)
        .json({ message: `Error creating card! status: ${response.status}` })
    }

    const result = (await response.json()) as CreateCardResponse
    console.log('Result from addCreditCard', result)
    if (result.statusCode != '101') {
      return res
        .status(500)
        .json({ message: 'Error adding credit card to North Capital' })
    }
  }
  // init cc fund movement
  else if (paymentForm.paymentMethod == 'ach') {
  }
  // if ach
  // add external account
  // init transfer

  return res.status(200).json({ message: 'We got it' })
}

const getTradeIdFromCreateTradeResponse = (result: CreateTradeResponse) => {
  var tradeObject = result.purchaseDetails[1] as PurchaseDetail[]
  if (!tradeObject || !tradeObject[0].tradeId) {
    console.log('Failed to get trade ID', tradeObject)
    return ''
  }
  return tradeObject[0].tradeId
}
