import Header from '../../../../components/navigation/Header'
import {
  DisplayOffering,
  DisplayOfferingResource,
  DisplayOfferingSection,
  DisplayOfferingSectionResource,
} from '../../../../types/typings'
import { prisma } from '../../../../lib/db'
import { GetServerSideProps } from 'next/types'
import {
  convertDateToSimpleString,
  mapResourceType,
  mapStatusId,
} from '../../../../utils/mappers'
import { formatter } from '../../../../utils/formatters'
import { useEffect, useState } from 'react'
import { PaperClipIcon, PlusIcon } from '@heroicons/react/solid'
import { NewSectionResource } from '../../../../components/admin/EditOffering/NewSectionResource'
import { makeID } from '../../../../utils/utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  offeringForDisplay: DisplayOffering
}

export default function EditOfferingPage({ offeringForDisplay }: Props) {
  const [offeringSections, setOfferingSections] = useState<DisplayOfferingSection[]>([])

  const createNewSection = () => {
    offeringSections.forEach((section) => {
      section.displayOrder++
    })
    let blankSection = {
      id: makeID(5),
      title: 'New Section',
      subtitle: '',
      order: 0,
      displayOrder: 0,
      resources: [],
    } as DisplayOfferingSection

    // have to do this funky way of setting state to get component to re-render
    var currentOfferingSections = offeringSections.slice()
    currentOfferingSections.push(blankSection)
    currentOfferingSections.sort((a, b) =>
      a.displayOrder > b.displayOrder ? 1 : -1
    )

    setOfferingSections(currentOfferingSections)
  }

  function deleteOfferingSection(id: string) {
    setOfferingSections(offeringSections.filter(function(value, _index, _arr){
      return value.id != id
    }))
  }

  return (
    <div className="min-h-full">
      <Header />
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        {/* Left sidebar & main wrapper */}
        <div className="min-w-0 flex-1 bg-white xl:flex">
          <div className="border-b border-gray-200 bg-white xl:w-64 xl:flex-shrink-0 xl:border-b-0 xl:border-r xl:border-gray-200">
            <div className="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
              {/* Start left column area */}
              <div className="mt-5 border-t border-gray-200">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Offering{' '}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.name}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.status}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Goal</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.goal}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Pledged
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.pledged}
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.startDate}
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      End Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {offeringForDisplay.endDate}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* End left column area */}
            </div>
          </div>

          <div className="bg-white lg:min-w-0 lg:flex-1">
            <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
              {/* {offeringSections.length > 0 && ( */}
              <>
                {offeringSections.map((section, sectionIdx) => {
                  return (
                    <div
                      className="my-4 block rounded-lg border-2 border-dashed border-gray-300 bg-gray-200"
                      key={section.displayOrder}
                    >
                      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                          <div className="ml-4 mt-2">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              New Offering Section
                            </h3>
                          </div>
                          <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                              onClick={() => deleteOfferingSection(section.id)}
                              type="button"
                              className="relative mr-2 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>{' '}
                      <input
                        className="block w-full rounded-md sm:text-sm"
                        type="text"
                        name="section-title"
                        placeholder="Section Title"
                      />
                      <input
                        className="block w-full rounded-md sm:text-sm"
                        type="text"
                        name="section-subtitle"
                        placeholder="Section Subtitle"
                      />
                      <textarea
                        className="block w-full resize-y rounded-md sm:text-sm"
                        rows={2}
                        name="section-description"
                        placeholder="Section Description"
                      />
                      <div className="grid w-full grid-cols-4 p-2">
                        <div className="col-span-1">
                          <NewSectionResource />
                        </div>
                        <div className="col-span-1">
                          <NewSectionResource />
                        </div>
                        <div className="col-span-1">
                          <NewSectionResource />
                        </div>
                        <div className="col-span-1">
                          <NewSectionResource />
                        </div>
                      </div>
                    </div>
                  )
                })}
                {/* Start main area*/}
                <button
                  onClick={() => createNewSection()}
                  type="button"
                  className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                    />
                  </svg>
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Create a new section
                  </span>
                </button>
                {/* End main area */}
              </>
            </div>
          </div>
        </div>

        <div className="pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
          <div className="h-full py-6 pl-6 lg:w-80">
            {/* Start right column area */}
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
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
            {/* End right column area */}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  var offering = await prisma.offering.findUnique({
    where: {
      slug: context.params?.slug as string,
    },
    include: {
      sections: {
        include: {
          resources: true,
        },
      },
      offeringParameters: true,
      offeringHistory: true,
    },
  })

  if (!offering) {
    return {
      props: {},
    }
  }

  // #1 Create main display object
  let offeringForDisplay = {
    name: offering.name,
    slug: offering.slug,
    status: mapStatusId(offering.statusId),
    goal: formatter.format(offering.goal),
    pledged: formatter.format(offering.pledged),
    startDate: convertDateToSimpleString(offering.startTimestamp),
    endDate: convertDateToSimpleString(offering.endTimestamp),
  } as DisplayOffering

  // #2 Create sections
  offering.sections.forEach((section) => {
    let sectionForOffering = {
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      order: section.order,
      displayOrder: section.order,
    } as DisplayOfferingSection

    section.resources.forEach((resource) => {
      let resourceForSection = {
        id: resource.id,
        title: resource.title,
        subtitle: resource.subtitle,
        description: resource.description,
        location: resource.location,
        type: mapResourceType(resource.type),
        order: resource.order,
      } as DisplayOfferingSectionResource

      sectionForOffering.resources.push(resourceForSection)
    })

    // list section resources by order
    sectionForOffering.resources?.sort((a, b) =>
      a.displayOrder > b.displayOrder ? 1 : -1
    )
    offeringForDisplay.sections.push(sectionForOffering)
  })

  // list sections by order
  offeringForDisplay.sections?.sort((a, b) =>
    a.displayOrder > b.displayOrder ? 1 : -1
  )

  return {
    props: {
      offeringForDisplay,
    },
  }
}


