import Header from '../../../../components/Header'
import {
  DisplayOffering,
  DisplayOfferingResource,
  DisplayOfferingSection,
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
      id: '',
      title: '',
      subtitle: '',
      order: 0,
      displayOrder: 0,
      resources: [],
    } as DisplayOfferingSection

    // have to do this funky way of setting state to get component to re-render
    var currentOfferingSections = offeringSections.slice()
    currentOfferingSections.push(blankSection)
    currentOfferingSections.sort((a, b) => (a.displayOrder > b.displayOrder ? 1 : -1))

    setOfferingSections(currentOfferingSections)
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
              <>
                {offeringSections.map((section, sectionIdx) => {
                  <div className="bg-gray-300">
                    <p className='text-lg'>Hello!</p>
                  </div>
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

        <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
          <div className="h-full py-6 pl-6 lg:w-80">
            {/* Start right column area */}
            <div className="relative h-full" style={{ minHeight: '16rem' }}>
              <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" />
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
      } as DisplayOfferingResource

      sectionForOffering.resources.push(resourceForSection)
    })

    // list section resources by order
    sectionForOffering.resources?.sort((a, b) => (a.displayOrder > b.displayOrder ? 1 : -1))
    offeringForDisplay.sections.push(sectionForOffering)
  })

  // list sections by order
  offeringForDisplay.sections?.sort((a, b) => (a.displayOrder > b.displayOrder ? 1 : -1))

  return {
    props: {
      offeringForDisplay,
    },
  }
}
