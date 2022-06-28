import React, { Fragment, useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import Header from '../../components/Header'
import AccountType from '../../components/invest/AccountType'
import { PersonalInformation } from '../../components/invest/PersonalInformation'
import AccreditationStatus from '../../components/invest/AccreditationStatus'
import SignDocuments from '../../components/invest/SignDocuments'
import { SubmitPayment } from '../../components/invest/SubmitPayment'
import { useInvestorForm } from '../../lib/zustand/investorFormStore'
import { GetServerSideProps } from 'next'
import useUserProfile from '../../hooks/useUserProfile'
import { UserProfile } from '@prisma/client'
import useOrCreateUserProfile from '../../hooks/useOrCreateUserProfile'
import { KYCAMLInvestorFlow } from '../../components/invest/KYCAMLInvestorFlow'
import { convertDateToSimpleString, mapDatabaseTimestampToDateFormat } from '../../utils/mappers'
import { useRouter } from 'next/router'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Invest() {
  const investorForm = useInvestorForm()
  const { userProfile, session, isLoading, isError } = useOrCreateUserProfile()

  useEffect(() => {
    if(userProfile?.accountType){
      investorForm.setAccountType(userProfile.accountType)
    }
    if(userProfile?.entityName){
      investorForm.setEntityName(userProfile.entityName)
    }
    if(userProfile?.firstName){
      investorForm.setFirstName(userProfile.firstName)
    }
    if(userProfile?.middleName){
      investorForm.setMiddleName(userProfile.middleName)
    }
    if(userProfile?.lastName){
      investorForm.setLastName(userProfile.lastName)
    }
    if(userProfile?.email){
      investorForm.setEmail(userProfile.email)
    }
    if(userProfile?.phone){
      investorForm.setPhone(userProfile.phone)
    }
    if(userProfile?.dob){
      investorForm.setDateOfBirth(mapDatabaseTimestampToDateFormat(userProfile.dob))
    }
    if(userProfile?.country){
      investorForm.setCountryOfResidence(userProfile.country)
    }
    if(userProfile?.city){
      investorForm.setCity(userProfile.city)
    }
    if(userProfile?.address1){
      investorForm.setAddress1(userProfile.address1)
    }
    if(userProfile?.unit){
      investorForm.setUnit(userProfile.unit)
    }
    if(userProfile?.address2){
      investorForm.setAddress2(userProfile.address2)
    }
    if(userProfile?.state){
      investorForm.setState(userProfile.state)
    }
    if(userProfile?.zipCode) {
      investorForm.setZipCode(userProfile.zipCode)
    }
    if(userProfile?.residence){
      investorForm.setResidence(userProfile.residence)
    }
  }, [userProfile])


  return (
    <>
      <Header />
      <div className="mx-auto px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Tab.Group
          selectedIndex={investorForm.stepNumber}
          onChange={(index) => {
            investorForm.setStepNumber(index)
          }}
        >
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Account Type
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Personal Information
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Complete KYC/AML Check
              </Tab>
              {/* <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Accreditation Status
              </Tab> */}
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Sign Documents
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Submit Payment
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            <Tab.Panel className="-mb-10">
              <h3 className="sr-only">Account Type</h3>
              <AccountType userProfile={userProfile as UserProfile} />
            </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Personal Information</h3>
              <PersonalInformation userProfile={userProfile as UserProfile}/>
            </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Complete KYC/AML Check</h3>
              <KYCAMLInvestorFlow userProfile={userProfile as UserProfile}/>
            </Tab.Panel>


            {/* <Tab.Panel className="pt-10">
              <h3 className="sr-only">Accreditation Status</h3>
              <AccreditationStatus />
            </Tab.Panel> */}

            <Tab.Panel className="pt-10">
              <h3 className="sr-only">Sign Documents</h3>
              <SignDocuments />
            </Tab.Panel>

            <Tab.Panel className="pt-10">
              <h3 className="sr-only">Submit Payment</h3>
              <SubmitPayment />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}