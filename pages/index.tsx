import { Fragment, useState } from 'react'
import Header from '../components/Header'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { signIn, useSession } from 'next-auth/react'
import LoginCard from '../components/LoginCard'

const collections = [
  {
    name: 'Multivest',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: 'Natural Coin',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'JennyCo',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
    imageAlt:
      'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
]
const trendingRaises = [
  {
    id: 1,
    name: 'Mainvest',
    color: 'Natural',
    price: '$75',
    option: 'Equity',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
    description: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 2,
    name: 'Accelerator Growths',
    color: 'Natural',
    price: '$75',
    option: 'Equity',

    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
    description: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 3,
    name: '3-D Printed Houses',
    color: 'Natural',
    price: '$75',
    option: 'Equity',

    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
    description: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 4,
    name: 'Pocket Mustaches',
    color: 'Natural',
    price: '$75',
    option: 'Equity',

    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
    description: 'Hand stitched, orange leather long wallet.',
  },
  // More raises...
]
const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your raises within hours.',
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="relative overflow-hidden bg-white">
      <Header />

      <main>
        <div className="mx-auto max-w-6xl rounded-lg  md:max-w-7xl">
          <div className="p-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="z-10 px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-8 lg:flex lg:items-center lg:text-left">
              <div>
                <a
                  href="#"
                  className="inline-flex items-center rounded-full border border-gray-700 bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base"
                >
                  <span className="rounded-full bg-cr-primary px-3 py-0.5 text-xs font-semibold uppercase leading-5 tracking-wide text-white">
                    Need funds?
                  </span>
                  <span className="ml-4 text-sm text-stone-900">
                    Start your own ChainRaise!
                  </span>
                  <ChevronRightIcon
                    className="ml-2 h-5 w-5 text-cr-primary"
                    aria-hidden="true"
                  />
                </a>
                <h1 className="my-4 text-4xl tracking-tight sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <span className="font-bold text-cr-primary md:block">
                    Investing in the next big thing should be for
                  </span>{' '}
                  <span className="bg-gradient-to-r from-cr-secondary to-cr-primary bg-clip-text pb-3 font-extrabold text-transparent md:block">
                    everybody
                  </span>
                </h1>
                <p className="mt-3 text-base text-stone-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Join ChainRaise now to get started investing in start-ups and
                  small businesses doing things you care about.
                </p>
                {/* <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-white sm:mt-10">
                  Used by
                </p>
                <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                        alt="Tuple"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                        alt="Workcation"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                        alt="StaticKit"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {!session && (
              <div className="mt-16 sm:mt-24 lg:col-span-4 lg:mt-0">
                <LoginCard />
              </div>
            )}
          </div>
        </div>

        <section aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-16">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                Trending Raises
              </h2>
              <a
                href="#"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                View all raises<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {trendingRaises.map((raise) => (
                <div
                  key={raise.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                      src={raise.imageSrc}
                      alt={raise.imageAlt}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={raise.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {raise.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">{raise.description}</p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-500">
                        {raise.option}
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {raise.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-sm md:hidden">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all raises<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="perks-heading"
          className="border-t border-gray-200 bg-gray-50"
        >
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0">
                    <div className="flow-root">
                      <img
                        className="-my-1 mx-auto h-24 w-auto"
                        src={perk.imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-stone-900">
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
