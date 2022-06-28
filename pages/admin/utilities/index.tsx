import { useEffect, useState } from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, UserGroupIcon } from '@heroicons/react/solid'
import Header from '../../../components/Header'
import useOrCreateProfile from '../../../hooks/useOrCreateProfile'
import { DeleteLink } from '../../../components/admin/nc/DeleteLink'


export default function AdminPage() {
  const { profile, session, isLoading, isError } = useOrCreateProfile()

  const seedDatabase = () => {
    const seedPost = async () => {
      await fetch('/api/admin/seed', {
        method: 'POST',
      })
    }
    seedPost().catch(console.error)
  }

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
                          {', ' + profile?.username ||
                            ', ' + profile?.firstName ||
                            '!'}
                        </h1>
                      </div>
                      <dl className="group mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 group-hover:opacity-10 sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          Verified account
                        </dd>
                        <dt className="sr-only">KYC/AML status</dt>
                        <dd className="mt-3 hidden items-center text-sm font-medium capitalize text-gray-500 group-hover:flex sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          KYC/AML Verified
                        </dd>
                        <dt className="sr-only">Accreditation Status</dt>
                        <dd className="mt-3 hidden items-center  text-sm font-medium capitalize text-gray-500 group-hover:flex sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          No Accreditation Required
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
              <span className="relative z-0 inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => seedDatabase()}
                  type="button"
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  Seed Database
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  Create Test Offering
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  Days
                </button>
              </span>
             
            </div>
          </div>

          <div className='mt-8'>
            <DeleteLink></DeleteLink>
          </div>
        </main>
      </div>
    </div>
  )
}
