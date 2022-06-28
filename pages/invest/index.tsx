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
import useProfile from '../../hooks/useProfile'
import { Profile } from '@prisma/client'
import useOrCreateProfile from '../../hooks/useOrCreateProfile'
import { KYCAMLInvestorFlow } from '../../components/invest/KYCAMLInvestorFlow'
import { convertDateToSimpleString, mapDatabaseTimestampToDateFormat } from '../../utils/mappers'
import { useRouter } from 'next/router'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Invest() {
  const investorForm = useInvestorForm()
  const { profile, session, isLoading, isError } = useOrCreateProfile()

  useEffect(() => {
    if(profile?.accountType){
      investorForm.setAccountType(profile.accountType)
    }
    if(profile?.entityName){
      investorForm.setEntityName(profile.entityName)
    }
    if(profile?.firstName){
      investorForm.setFirstName(profile.firstName)
    }
    if(profile?.middleName){
      investorForm.setMiddleName(profile.middleName)
    }
    if(profile?.lastName){
      investorForm.setLastName(profile.lastName)
    }
    if(profile?.email){
      investorForm.setEmail(profile.email)
    }
    if(profile?.phone){
      investorForm.setPhone(profile.phone)
    }
    if(profile?.dob){
      investorForm.setDateOfBirth(mapDatabaseTimestampToDateFormat(profile.dob))
    }
    if(profile?.country){
      investorForm.setCountryOfResidence(profile.country)
    }
    if(profile?.city){
      investorForm.setCity(profile.city)
    }
    if(profile?.address1){
      investorForm.setAddress1(profile.address1)
    }
    if(profile?.unit){
      investorForm.setUnit(profile.unit)
    }
    if(profile?.address2){
      investorForm.setAddress2(profile.address2)
    }
    if(profile?.state){
      investorForm.setState(profile.state)
    }
    if(profile?.zipCode) {
      investorForm.setZipCode(profile.zipCode)
    }
    if(profile?.residence){
      investorForm.setResidence(profile.residence)
    }
  }, [profile])


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
              <AccountType profile={profile as Profile} />
            </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Personal Information</h3>
              <PersonalInformation profile={profile as Profile}/>
            </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Complete KYC/AML Check</h3>
              <KYCAMLInvestorFlow profile={profile as Profile}/>
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