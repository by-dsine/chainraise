/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  BookmarkIcon,
  ClockIcon,
  CogIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  XIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline'
import {
  CashIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  PaperClipIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'
import Header from '../../components/Header'
import useOrCreateUserProfile from '../../hooks/useOrCreateUserProfile'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'History', href: '#', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
  { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const cards = [
  {
    name: 'Investments',
    href: '#',
    icon: CurrencyDollarIcon,
    amount: '1',
  },
  { name: 'Saved Offerings', href: '#', icon: UserGroupIcon, amount: '42' },

  // More items...
]

const actions = [
  { name: 'Complete Investor Flow', href: '#', icon: ExclamationCircleIcon },
]
const transactions = [
  {
    id: 1,
    name: 'Payment to Multivest',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2022',
    datetime: '2022-07-11',
  },
  {
    id: 2,
    name: 'Payment to Super Cool Business',
    href: '#',
    amount: '$10,000',
    currency: 'USD',
    status: 'success',
    date: 'July 23, 2022',
    datetime: '2022-07-23',
  },
  {
    id: 3,
    name: 'Payment to ChainRaise',
    href: '#',
    amount: '$15,000',
    currency: 'USD',
    status: 'success',
    date: 'July 30, 2022',
    datetime: '2022-07-30',
  },
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
  const { userProfile, session, isLoading, isError } = useOrCreateUserProfile()

  const [isEditingFirstName, setEditingFirstName] = useState(false)
  const [isEditingMiddleName, setEditingMiddleName] = useState(false)
  const [isEditingLastName, setEditingLastName] = useState(false)
  const [isEditingEmail, setEditingEmail] = useState(false)
  const [isEditingPhone, setEditingPhone] = useState(false)

  const [isEditingStreetAddress, setEditingStreetAddress] = useState(false)
  const [isEditingUnit, setEditingUnit] = useState(false)
  const [isEditingCity, setEditingCity] = useState(false)
  const [isEditingState, setEditingState] = useState(false)
  const [isEditingZipCode, setEditingZipCode] = useState(false)

  const [isEditingNationality, setEditingNationality] = useState(false)
  const [isEditingCountryOfResidence, setEditingCountryOfResidence] =
    useState(false)
  const [isEditingAccreditationMethod, setEditingAccreditationMethod] =
    useState(false)

  return (
    <div className="min-h-full">
      <Header />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 pb-8">
          {/* Page header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="min-w-0 flex-1">
                  {/* Profile */}
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          Welcome to ChainRaise
                          {', ' + userProfile?.username ||
                            ', ' + userProfile?.firstName ||
                            '!'}
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          Verified account
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    Update Profile Information
                  </button>
                  <Link href="/profile">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      View Account Summary
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and contact information.
                </p>
              </div>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      First name
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingFirstName ? (
                        <div className="flex-grow">
                          <label htmlFor="first-name" className="sr-only">
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="first-name"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="First name"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Margot</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingFirstName(!isEditingFirstName)
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Middle name
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingMiddleName ? (
                        <div className="flex-grow">
                          <label htmlFor="middle-name" className="sr-only">
                            Middle name
                          </label>
                          <input
                            type="text"
                            name="middle-name"
                            id="middle-name"
                            autoComplete="middle-name"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Middle name"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Janice</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingMiddleName(!isEditingMiddleName)
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Last name
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingLastName ? (
                        <div className="flex-grow">
                          <label htmlFor="last-name" className="sr-only">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="last-name"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Last name"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Smith</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingLastName(!isEditingLastName)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingEmail ? (
                        <div className="flex-grow">
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="email@email.com"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">
                          margotfoster@example.com
                        </span>
                      )}

                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingEmail(!isEditingEmail)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingPhone ? (
                        <div className="flex-grow">
                          <label htmlFor="phone" className="sr-only">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            autoComplete="phone"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="(602) 555-5555"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">{'(602) 555-5555'}</span>
                      )}

                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingPhone(!isEditingPhone)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="relative my-1">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Address
                  </span>
                </div>
              </div>

              <div>
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Street address
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingStreetAddress ? (
                        <div className="flex-grow">
                          <label htmlFor="street-address" className="sr-only">
                            Street address
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="123 Main St."
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">123 Main St.</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingStreetAddress(!isEditingStreetAddress)
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Suite/Unit
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingUnit ? (
                        <div className="flex-grow">
                          <label htmlFor="suite-unit" className="sr-only">
                            Suite/Unit
                          </label>
                          <input
                            type="text"
                            name="suite-unit"
                            id="suite-unit"
                            autoComplete="suite-unit"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="#42"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">#42</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingUnit(!isEditingUnit)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingCity ? (
                        <div className="flex-grow">
                          <label htmlFor="city" className="sr-only">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="city"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Phoenix"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Phoenix</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingCity(!isEditingCity)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      State/Region
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingState ? (
                        <div className="flex-grow">
                          <label htmlFor="state" className="sr-only">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            autoComplete="state"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="AZ"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Arizona</span>
                      )}

                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingState(!isEditingState)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Zip Code
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingZipCode ? (
                        <div className="flex-grow">
                          <label htmlFor="zipCode" className="sr-only">
                            Zip/Postal Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            autoComplete="zipCode"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="85019"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">{'85019'}</span>
                      )}

                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEditingZipCode(!isEditingZipCode)}
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="relative my-1">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Identity Verification
                  </span>
                </div>
              </div>

              <div>
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Nationality
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingNationality ? (
                        <div className="flex-grow">
                          <label htmlFor="nationality" className="sr-only">
                            Nationality
                          </label>
                          <input
                            type="text"
                            name="nationality"
                            id="nationality"
                            autoComplete="nationality"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="United States of America"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">
                          United States of America
                        </span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingNationality(!isEditingNationality)
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Country of Residence
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingCountryOfResidence ? (
                        <div className="flex-grow">
                          <label htmlFor="country" className="sr-only">
                            Country of Residence
                          </label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            autoComplete="country"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="United States of America"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">
                          United States of America
                        </span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingCountryOfResidence(
                              !isEditingCountryOfResidence
                            )
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="relative my-1">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Electronic Delivery Consent
                  </span>
                </div>
              </div>

              <div>
                <fieldset className="space-y-5">
                  <legend className="sr-only">Notifications</legend>
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="electronic-consent"
                        aria-describedby="electronic-consentn"
                        name="electronic-consent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="electronic-consent"
                        className="font-medium text-gray-700"
                      >
                        I agree
                      </label>
                      <span id="electronic-consent" className="text-gray-500">
                        <span className="sr-only">Electronic Consent </span> to
                        receive all notifications via Electronic Delivery.
                      </span>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Accreditation Status
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Manage your accreditation status here.
                </p>
              </div>

              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Accreditation Method
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditingAccreditationMethod ? (
                        <div className="flex-grow">
                          <label htmlFor="first-name" className="sr-only">
                            Accreditation Method
                          </label>
                          <input
                            type="text"
                            name="accreditation-method"
                            id="accreditation-method"
                            autoComplete="accreditation-method"
                            className="block w-full rounded-md border-gray-300  placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Accreditation Method"
                          />
                        </div>
                      ) : (
                        <span className="flex-grow">Individual</span>
                      )}
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            setEditingAccreditationMethod(
                              !isEditingAccreditationMethod
                            )
                          }
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Attachments
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              resume_back_end_developer.pdf
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              coverletter_back_end_developer.pdf
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
