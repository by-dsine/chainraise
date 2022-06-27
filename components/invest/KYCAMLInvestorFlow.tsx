import { UserProfile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/solid'
import { useInvestorForm } from '../../lib/zustand/investorFormStore'
import { KYCAMLForm, KYCAMLStatus, onboardStatus } from '../../types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { AUTO_APPROVED, NOT_STARTED } from '../../constants/const'

type Props = {
  userProfile: UserProfile
}

export const KYCAMLInvestorFlow = ({ userProfile }: Props) => {
  const [kycStateLoading, setKycStateLoading] = useState(false)

  const investorForm = useInvestorForm()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  // https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/10
  let schema = yup.object().shape({
    firstName: yup.string().required('Please enter a first name.'),
    middleName: yup.string(),
    lastName: yup.string().required('Please emter a last name.'),
    email: yup.string().email().required('Please enter an email.'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Please enter a valid phone number.'),
    country: yup.string().required('Please select a country.'),
    address1: yup.string().required('Please enter a valid address.'),
    address2: yup.string(),
    city: yup.string().required('Please enter a city.'),
    state: yup.string().required('Please enter a state.'),
    zipCode: yup.string().required('Please enter a zip code.'),
    dob: yup.string().required('Please enter a date of birth.'),
    residence: yup.string().required('Please select a residence option.'),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<KYCAMLForm>({
  })

  useEffect(()=>{
    console.log(errors)
  }, [errors])

  useEffect(() => {
    const getKYC = async () => {
      setKycStateLoading(true)

      const response = await fetch('/api/nc/kyc', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const result = (await response.json()) as KYCAMLStatus
      setKycStateLoading(false)
      if (result.kycStatus && result.amlStatus) {
        investorForm.setKycStatus(result.kycStatus)
        investorForm.setAmlStatus(result.amlStatus)
      }
    }

    getKYC().catch(console.error)
  }, [])

  const onSubmit = handleSubmit((data) => {
    setKycStateLoading(true)

    console.log('Making a call to get KYC')

    var currentKYCStatus = investorForm.kycStatus
    var currentAMLStatus = investorForm.amlStatus

    const checkKyc = async() => {
      const response = await fetch('/api/nc/kyc', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      const result = (await response.json()) as KYCAMLStatus
      setKycStateLoading(false)
      if (result.kycStatus && result.amlStatus) {
        investorForm.setKycStatus(result.kycStatus)
        investorForm.setAmlStatus(result.amlStatus)
        currentKYCStatus = result.kycStatus
        currentAMLStatus = result.amlStatus
      }
    }

    const completeNorthCapitalOnboard = async() => {
      // Create a North Capital Party and Link for this account
      const onboardResponse = await fetch('/api/nc/onboard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      const onboardResult = (await onboardResponse.json()) as onboardStatus
      console.log(onboardResult)
    }
   
    if(currentKYCStatus != AUTO_APPROVED){
      checkKyc().catch(console.error)    
      // TODO: Show an error and next steps if AUTO_APPROVED doesn't come back
    }

    if(currentKYCStatus == AUTO_APPROVED){
      completeNorthCapitalOnboard().catch(console.error)
    }

    investorForm.setStepNumber(4)
  })

  return (
    <>
      {!kycStateLoading && investorForm.kycStatus && (
        <div className="flex flex-col">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Current KYC/AML Status:
          </h3>
          <h1 className="pt-4 text-lg">KYC Status: {investorForm.kycStatus}</h1>
          <h1 className="pt-4 text-lg">AMC Status: {investorForm.amlStatus}</h1>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="pt-4 sm:pt-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Information to be submitted for KYC/AML
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-gray-500">
            Verify the information submitted below to submit for KYC/AML check.
            Click{' '}
            <Link href="/learn/kyc-aml">
              <span className="cursor-pointer text-cyan-500 underline">
                here
              </span>
            </Link>{' '}
            to learn more about the KYC/AML process.
          </p>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">First name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.firstName}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Middle Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.middleName}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.lastName}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Address 1</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.address1}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Address 2</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.address2}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Unit</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.unit}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.city}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">State</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.state}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Zip Code</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.zipCode}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">
                Date of Birth
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.dateOfBirth}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Residence</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{investorForm.residence}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => investorForm.setStepNumber(1)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative pb-5">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        <div className="pb-10">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Previous
            </button>
            {/* {investorForm.kycStatus == NOT_STARTED && (
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            )} */}
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
