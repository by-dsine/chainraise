import create from 'zustand'
import { CCPayment, ExternalBankAccountInfo } from '../../types/typings'

interface paymentMethodStore {
  offeringSlug: string
  setOfferingSlug: (newOfferingSlug: string) => void
  accountId: string
  setAccountId: (newAccountId: string) => void
  paymentMethod: string
  setPaymentMethod: (paymentMethod: string) => void
  transactionAmount: number
  setTransactionAmount: (transactionAmount: number) => void
  cc: CCPayment
  setCC: (ccPayment: CCPayment) => void
  ach: ExternalBankAccountInfo
  setACH: (achPayment: ExternalBankAccountInfo) => void
}

export const usePaymentMethodStore = create<paymentMethodStore>((set) => ({
  offeringSlug: '',
  setOfferingSlug: (value) => {
    set((state) => ({
      ...state,
      offeringSlug: value,
    }))
  },
  accountId: '',
  setAccountId: (value) => {
    set((state) => ({
      ...state,
      accountId: value,
    }))
  },
  transactionAmount: 0,
  setTransactionAmount: (value) => {
    set((state) => ({
      ...state,
      transactionAmount: value,
    }))
  },
  paymentMethod: '',
  setPaymentMethod: (value) => {
    set((state) => ({
      ...state,
      paymentMethod: value,
    }))
  },
  cc: {
    ownerName: '',
    cardNumber: 0,
    expirationDate: '',
    cvvNumber: 0,
    cardType: '',
    createdIpAddress: '',
  },
  setCC: (value) => {
    set((state) => ({
      ...state,
      cc: value,
    }))
  },
  ach: {
    accountHolderName: '',
    accountName: '',
    routingNumber: 0,
    accountNumber: 0,
    bankName: '',
    accountType: '',
  },
  setACH: (value) => {
    set((state) => ({
      ...state,
      ach: value,
    }))
  },
}))
