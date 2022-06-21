import { Fragment, useEffect, useState } from 'react'
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
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'
import Header from '../../components/Header'
import useOrCreateUserProfile from '../../hooks/useOrCreateUserProfile'
import Link from 'next/link'
import { CRAdminStatistics, DisplayAdminInfo, DisplayAdminOffering, DisplayAdminUser } from '../../types/typings'
import UsersTable from '../../components/admin/UsersTable'
import { GetServerSideProps } from 'next'
import { useAllUsersForAdmin } from '../../hooks/users'
import { useDisplayStore } from '../../lib/zustand/displayAdminStore'
import OfferingsTable from '../../components/admin/OfferingsTable'

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

  let { users } = useAllUsersForAdmin()

  const usersForDisplay = useDisplayStore(store => store.displayUsers)
  const addUserToDisplayTable = useDisplayStore(store => store.addDisplayUser)
  const offeringsForDisplay = useDisplayStore(store => store.displayOfferings)
  const addOfferingToDisplayTable = useDisplayStore(store => store.addDisplayOffering)


  const [numOfferings, setNumOfferings] = useState(0)
  const [numUsers, setNumUsers] = useState(0)
  const [isFetching, setFetching] = useState(false)
  const [table, setTable] = useState('Offerings')

  useEffect(() => {
    const fetchStatsData = async () => {
      const response = await fetch('api/statistics/admin', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      const result = (await response.json()) as CRAdminStatistics
      setNumUsers(result.userCount)
      setNumOfferings(result.offeringsCount)
      console.log('Admin stats received: ', result)
    }
    fetchStatsData().catch(console.error)

    const fetchUserData = async () => {
      const response = await fetch('/api/admin/display', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      const result = (await response.json()) as DisplayAdminInfo
      const offerings = result.offerings
      const users = result.users

      users?.forEach((userForDisplay) => {
        addUserToDisplayTable(userForDisplay)
      })

      offerings?.forEach((offeringForDisplay) => {
        addOfferingToDisplayTable(offeringForDisplay)
      })

      console.log(usersForDisplay)
    }
    fetchUserData().catch(console.error)

  }, [])

  const cards = [
    {
      name: 'Offerings',
      icon: CurrencyDollarIcon,
      amount: numOfferings,
    },
    { name: 'Users', icon: UserGroupIcon, amount: numUsers },

    // More items...
  ]

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
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Overview
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card */}
                {cards.map((card) => (
                  <div key={card.name} className="rounded-lg bg-white shadow">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <card.icon
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">
                              {card.name}
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {card.amount}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <button
                          className="font-medium text-cyan-700 hover:text-cyan-900"
                          onClick={() => setTable(card.name)}
                        >
                          View all
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {(() => {
                switch (table) {
                  case 'Users':
                    return <UsersTable />
                  case 'Offerings':
                    return <OfferingsTable />
                  default:
                    return null
                }
              })()}
            </div>

            {/* <div className="shadow sm:hidden">
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
              >
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <a
                      href={transaction.href}
                      className="block bg-white px-4 py-4 hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex flex-1 space-x-2 truncate">
                          <CashIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="flex flex-col truncate text-sm text-gray-500">
                            <span className="truncate">{transaction.name}</span>
                            <span>
                              <span className="font-medium text-gray-900">
                                {transaction.amount}
                              </span>{' '}
                              {transaction.currency}
                            </span>
                            <time dateTime={transaction.datetime}>
                              {transaction.date}
                            </time>
                          </span>
                        </span>
                        <ChevronRightIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                aria-label="Pagination"
              >
                <div className="flex flex-1 justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            <div className="hidden sm:block">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mt-2 flex flex-col">
                  <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            scope="col"
                          >
                            Transaction
                          </th>
                          <th
                            className="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            scope="col"
                          >
                            Amount
                          </th>
                          <th
                            className="hidden bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            scope="col"
                          >
                            Status
                          </th>
                          <th
                            className="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            scope="col"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="bg-white">
                            <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                              <div className="flex">
                                <a
                                  href={transaction.href}
                                  className="group inline-flex space-x-2 truncate text-sm"
                                >
                                  <CashIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <p className="truncate text-gray-500 group-hover:text-gray-900">
                                    {transaction.name}
                                  </p>
                                </a>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                              <span className="font-medium text-gray-900">
                                {transaction.amount}{' '}
                              </span>
                              {transaction.currency}
                            </td>
                            <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                              <span
                                className={classNames(
                                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
                                )}
                              >
                                {transaction.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                              <time dateTime={transaction.datetime}>
                                {transaction.date}
                              </time>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav
                      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to{' '}
                          <span className="font-medium">10</span> of{' '}
                          <span className="font-medium">20</span> results
                        </p>
                      </div>
                      <div className="flex flex-1 justify-between sm:justify-end">
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}
