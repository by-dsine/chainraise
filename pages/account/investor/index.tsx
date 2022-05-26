import React from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import Header from '../../../components/Header'
import AccountType from '../components/AccountType'
import Link from 'next/link'

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Investor() {
  return (
    <>
      <Header />
      <div className="mt-4 lg:border-t lg:border-b lg:border-gray-200">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Progress"
        >
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={classNames(
                    stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                    stepIdx === steps.length - 1
                      ? 'rounded-b-md border-t-0'
                      : '',
                    'overflow-hidden border border-gray-200 lg:border-0'
                  )}
                >
                  {step.status === 'complete' ? (
                    <a href={step.href} className="group">
                      <span
                        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:pl-9' : '',
                          'flex items-center px-6 py-5 text-sm font-medium'
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                            <CheckIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wide">
                            {step.name}
                          </span>
                          {/* <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span> */}
                        </span>
                      </span>
                    </a>
                  ) : step.status === 'current' ? (
                    <a href={step.href} aria-current="step">
                      <span
                        className="absolute top-0 left-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:pl-9' : '',
                          'flex items-center px-6 py-5 text-sm font-medium'
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                            <span className="text-indigo-600">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            {step.name}
                          </span>
                          {/* <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span> */}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <a href={step.href} className="group">
                      <span
                        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:pl-9' : '',
                          'flex items-center px-6 py-5 text-sm font-medium'
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                            <span className="text-gray-500">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {step.name}
                          </span>
                          {/* <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span> */}
                        </span>
                      </span>
                    </a>
                  )}

                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-full w-full text-gray-300"
                          viewBox="0 0 12 82"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0.5 0V31L10.5 41L0.5 51V82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-12 max-w-4xl">
          <AccountType />
        </div>
      </div> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can recieve mail. This
                    information will only be visible to you and regulatory
                    bodies.
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="date-of-birth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date-of-birth"
                      id="date-of-birth"
                      autoComplete="date-of-birth"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="phone-number"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  

                  
                  
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


      </div>

    </>
  )
}
