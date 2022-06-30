import { useEffect, useState } from 'react'
import { CheckCircleIcon, PaperClipIcon } from '@heroicons/react/solid'
import Header from '../../components/navigation/Header'
import useOrCreateProfile from '../../hooks/useOrCreateProfile'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { KYCAMLStatus, PersonalInformationForm } from '../../types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import KYCModal from '../../components/profile/KYCModal'
import { useKycModal } from '../../lib/zustand/investorFormStore'
import { AUTO_APPROVED } from '../../lib/consts'
import { KYCAMLInvestorFlow } from '../../components/invest/KYCAMLInvestorFlow'

const residenceOptions = [
  { id: 'us-citizen', title: 'U.S. Citizen' },
  { id: 'us-resident', title: 'U.S. Resident' },
  { id: 'non-resident', title: 'Non-resident' },
]

export default function ProfilePage() {
  const [kycStatus, setKycStatus] = useState('')
  const { profile, session, isLoading, isError } = useOrCreateProfile()
  const kycModal = useKycModal()
  const [isKycDone, setKycDone] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/nc/kyc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      const result = (await response.json()) as KYCAMLStatus
      setKycStatus(result.kycStatus)
      setKycDone(result.kycStatus == AUTO_APPROVED)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <div className="min-h-full">
      {kycStatus && <KYCModal kycStatus={kycStatus} />}
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

          <div className="flex flex-1 overflow-hidden">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto"
            >
              <h1 id="primary-heading" className="sr-only">
                Account
              </h1>

              <div className="bg-white px-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Account Information
                  </h3>
                </div>
                <div className="mt-5 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">
                        First name
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">{profile?.firstName}</span>
                        <span className="ml-4 flex-shrink-0">
                          <button
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
                        Application for
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">Backend Developer</span>
                        <span className="ml-4 flex-shrink-0">
                          <button
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
                        Email address
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">
                          margotfoster@example.com
                        </span>
                        <span className="ml-4 flex-shrink-0">
                          <button
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
                        Salary expectation
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow"> $120,000</span>
                        <span className="ml-4 flex-shrink-0">
                          <button
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
              </div>
            </section>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden lg:block lg:flex-shrink-0 lg:mr-2">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-white">
                <div className="border-b border-gray-200 pb-2 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Documents
                  </h3>
                  <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex py-4">
                  <dd className="mt-1 w-full text-sm text-gray-900 sm:mt-0">
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
                            form_c.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                          <button
                            type="button"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 w-0 flex-1 truncate">
                            articles.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                          <button
                            type="button"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
