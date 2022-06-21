import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDisplayStore } from '../../lib/zustand/displayAdminStore'
import { DisplayAdminUser } from '../../types/typings'

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Lindsay Walton',
    accountType: 'Individual',
    KYCstatus: 'Auto-Approved',
    AMLstatus: 'Auto-Approved',
    accreditation: 'Individual',
  },
  // More people...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function OfferingsTable() {
  const offeringsForDisplay = useDisplayStore((state) => state.displayOfferings)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Offerings</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all offerings including their name, transacations, and
            documents.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/admin/offerings/new">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add offering
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Goal
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Pledged
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit Offering</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {offeringsForDisplay.map((offering, offeringIdx) => (
                    <tr key={offering.name}>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        {offering.name}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {offering.status}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell'
                        )}
                      >
                        {offering.goal}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {offering.pledged}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {offering.startDate}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {offering.endDate}
                      </td>
                      <td
                        className={classNames(
                          offeringIdx !== people.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                      >
                        <a
                          href={`/admin/offerings/edit/${offering.slug}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {offering.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
