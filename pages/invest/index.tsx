import React, { Fragment, useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import Header from '../../components/Header'
import AccountType from '../../components/account/AccountType'
import PersonalInformation from '../../components/account/PersonalInformation'
import AccreditationStatus from '../../components/account/AccreditationStatus'
import SignDocuments from '../../components/account/SignDocuments'
import { SubmitPayment } from '../../components/account/SubmitPayment'
import { useInvestorForm } from '../../lib/zustand/investorFormStore'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Investor() {
  const investorForm = useInvestorForm()

  return (
    <>
      <Header />
      <div className="mx-auto px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Tab.Group
          selectedIndex={investorForm.stepNumber}
          onChange={(index) => {
            investorForm.setStepNumber(index)
            console.log(index)
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
                Accreditation Status
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
              <AccountType />
            </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Personal Information</h3>
              <PersonalInformation />
            </Tab.Panel>

            <Tab.Panel className="pt-10">
              <h3 className="sr-only">Accreditation Status</h3>
              <AccreditationStatus />
            </Tab.Panel>

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
