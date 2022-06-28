import { Fragment, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const trendingRaises = [
  {
    id: 1,
    name: 'RJ\'s Pest Removal',
    color: 'Natural',
    price: '$5,000,000',
    options: 'Equity',
    href: 'offerings/test-offering',
    imageSrc: 'https://baseballhall.org/sites/default/files/styles/fullscreen_image_popup/public/islandora_images/Johnson%20Randy%2012-2012-971_Act_NBLMangin.jpg?itok=fRyMBHeQ',
    imageAlt: 'Let us pitch the only pest removal service.',
    description: 'Let us pitch the only pest removal service.',
  },
  {
    id: 2,
    name: 'Sportsball International',
    color: 'Natural',
    price: '$1,250,000',
    options: 'Equity',

    href: 'offerings/test-offering',
    imageSrc:
      'https://cdn.roosterteeth.com/image/upload/t_l/f_auto/3/e9afe27a-0a5b-4e37-ad56-69fc51e522f5.jpg/original/sportsballportrait1.jpg',
    imageAlt: 'Sportsball',
    description: 'Sportsball. Nuff\' said.',
  },
  {
    id: 3,
    name: 'Space Jam 4',
    color: 'Natural',
    price: '$3,045,000',
    options: 'Equity',

    href: 'offerings/test-offering',
    imageSrc:
      'https://summerofthearts.org/wp-content/uploads/Space-Jam-534x800.jpg',
    imageAlt: 'It\'s the movie nobody asked for but we wanna make it anyways.',
    description: 'It\'s the movie nobody asked for but we wanna make it anyways.',
  },
  {
    id: 4,
    name: 'Self Propelled Tennis Balls',
    color: 'Natural',
    price: '$250,000',
    options: 'Equity',
    href: 'offerings/test-offering',
    imageSrc:
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60',
    imageAlt: 'Wow they spin so fast.',
    description: 'Wow they spin so fast.',
  },
  {
    id: 5,
    name: 'Underwater Basketweaving International',
    color: 'Natural',
    price: '$3.50',
    options: 'Equity',

    href: 'offerings/test-offering',
    imageSrc:
      'https://media.istockphoto.com/photos/abandoned-ghost-net-fish-aggregating-device-polluting-the-ocean-near-picture-id1194423948?b=1&k=20&m=1194423948&s=170667a&w=0&h=JheqDD4oB0UnApCpsqm48GEZDLUnoOtWEZNtQvKs4_w=',
    imageAlt: "Damn that's a nice basket, son.",
    description: "Damn that's a nice basket, son.",
  },
  {
    id: 6,
    name: 'Weed',
    color: 'Natural',
    price: '$4,200,000',
    options: 'Equity',
    href: 'offerings/test',
    imageSrc:
      'https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FubmFiaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    imageAlt: 'Sheesh this is some dank stuff.',
    description: 'Sheesh this is some dank stuff.',
  },
  // More raises...
]

const perks = [
  {
    name: 'Access exclusive opportunities',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
    description:
      'Gain access to never before seen offerings available only on this platform',
  },
  {
    name: 'Done-for-you Due Diligence',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Our offerings are reviewed and checked for compliance with all pertinent regulatory bodies',
  },
  {
    name: 'Support Your Passions',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'Invest in the things you care about, and turn a profit too',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
    return (
    <div className="relative overflow-hidden bg-white">
      <Header />

      <main>
        {/* <div className="mx-auto max-w-6xl rounded-lg  md:max-w-7xl">
          <div className="p-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="z-10 px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-8 lg:flex lg:items-center lg:text-left">
              <div>
                <a
                  href="/raise-funds"
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
              </div>
              
            </div>
            <div className=''>
                <img src="/harold.jpg" alt="harold" />
              </div>
          </div>
        </div> */}
        {/* Hero */}
        <div className="mx-auto flex max-w-7xl flex-col border-b border-gray-200 lg:border-0">
          <div className="relative">
            {/* <div
              aria-hidden="true"
              className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
            /> */}
            <div className="relative bg-gray-100 lg:bg-transparent">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:grid-cols-1">

              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2"> */}
                <div className="mx-auto pt-24 pb-12 lg:max-w-none">
                  <div className="px-2">
                    <div className='w-full flex justify-center'>

                    <a
                      href="/raise-funds"
                      className="mx-auto inline-flex items-center rounded-full border border-gray-700 bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base"
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
                    </div>

                    <h1 className="my-4 text-4xl tracking-tight sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl text-center">
                      <span className="font-bold text-cr-primary">
                        Investing in the next big thing should be for
                      </span>{' '}
                      <span className="bg-gradient-to-r from-cr-secondary to-cr-primary bg-clip-text pb-3 font-extrabold text-transparent">
                        everybody
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-stone-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl text-center">
                      Join ChainRaise now to get started investing in start-ups
                      and small businesses doing things you care about.
                    </p>
                  </div>
                </div>
              </div>
{/* 
              <div className="h-48 p-2 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGl2ZXJzaXR5JTIwYnVzaW5lc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                  alt=""
                  className="hidden h-full rounded-md object-cover object-center"
                />
              </div> */}
            </div>
          </div>
        </div>

        <section aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-16">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending Raises
              </h2>
              <a
                href="/offerings"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                View all raises<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {trendingRaises.slice(0, 4).map((raise) => (
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
                        {raise.options}
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
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
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

      <Footer />
    </div>
  )
}
