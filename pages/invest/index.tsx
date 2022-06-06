import React, { Fragment } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import Header from '../../components/Header'
import AccountType from '../../components/account/AccountType'
import PersonalInformation from '../../components/account/PersonalInformation'
import AccreditationStatus from '../../components/account/AccreditationStatus'
import SignDocuments from '../../components/account/SignDocuments'
import { SubmitPayment } from '../../components/account/SubmitPayment'

const steps = [
  {
    id: '01',
    name: 'Account Type',
    description: 'Who do you represent?',
    href: '/account/investor',
    status: 'complete',
  },
  {
    id: '02',
    name: 'Personal Information',
    description: 'Who are you?',
    href: '/account/investor/submit-id',
    status: 'current',
  },
  {
    id: '03',
    name: 'Accreditation Status',
    description: 'Submit documentation for your accreditation.',
    href: '/account/investor/accreditation',
    status: 'upcoming',
  },
  {
    id: '04',
    name: 'Sign and Submit',
    description: 'Let me get yo autograph!',
    href: '/account/investor/sign',
    status: 'upcoming',
  },
  {
    id: '05',
    name: 'Submit Payment',
    description: 'Make the magic happen.',
    href: '/account/investor/payment',
    status: 'upcoming',
  },
]

const tabs = [
  { id: 1, name: 'Account Type', href: '#', count: '52', current: false },
  {
    id: 2,
    name: 'Personal Information',
    href: '#',
    count: '6',
    current: false,
  },
  { id: 3, name: 'Accreditation Status', href: '#', count: '4', current: true },
  { id: 4, name: 'Sign and Submit', href: '#', current: false },
  { id: 5, name: 'Submit Payment', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Investor() {
  return (
    <>
      <Header />
      <div className="mx-auto pt-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Tab.Group as="div">
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
