import { Fragment } from 'react'
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, SearchIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Header from '../../components/Header'
import { GetStaticProps } from 'next'
import { prisma } from '../../lib/db'

const trendingRaises = [
  {
    id: 1,
    name: 'Mainvest',
    color: 'Natural',
    price: '$5,000,000',
    options: 'Equity',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1558661091-5cc1b64d0dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2UlMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60',
    imageAlt: 'The creative real estate fund for everyone.',
    description: 'The creative real estate fund for everyone.',
  },
  {
    id: 2,
    name: 'Accelerator Growths',
    color: 'Natural',
    price: '$1,250,000',
    options: 'Equity',

    href: '#',
    imageSrc:
      'https://media.istockphoto.com/photos/metaverse-virtual-reality-picture-id1353445926?b=1&k=20&m=1353445926&s=170667a&w=0&h=9qj7HGyLdgGDPNhvLHBC6QpA9TgN__fchJATnNCkzNg=',
    imageAlt: 'We grow like really fast.',
    description: 'We grow like really fast.',
  },
  {
    id: 3,
    name: '3-D Printed Houses',
    color: 'Natural',
    price: '$3,045,000',
    options: 'Equity',

    href: '#',
    imageSrc:
      'https://media.istockphoto.com/photos/african-american-worker-working-on-installing-solar-panel-on-the-of-picture-id1310242633?b=1&k=20&m=1310242633&s=170667a&w=0&h=3DfRLwuGkVBm-OCbpGrlmCN9CAOsOfx58YAOzFv0g0Q=',
    imageAlt: 'There will be a house where there was not.',
    description: 'There will be a house where there was not.',
  },
  {
    id: 4,
    name: 'Pocket Mustaches',
    color: 'Natural',
    price: '$250,000',
    options: 'Equity',
    href: '#',
    imageSrc:
      'https://media.istockphoto.com/photos/mustache-selfie-picture-id619058004?b=1&k=20&m=619058004&s=170667a&w=0&h=BjS8pK7u4NAFK5g_pXJrclevz2Mi5xtsQilxykseAUs=',
    imageAlt: 'Hand stitched, organic, zero waste mustaches.',
    description: 'Hand stitched, organic, zero waste mustaches.',
  },
  {
    id: 5,
    name: 'Underwater Basketweaving International',
    color: 'Natural',
    price: '$3.50',
    options: 'Equity',

    href: '#',
    imageSrc:
      'https://media.istockphoto.com/photos/abandoned-ghost-net-fish-aggregating-device-polluting-the-ocean-near-picture-id1194423948?b=1&k=20&m=1194423948&s=170667a&w=0&h=JheqDD4oB0UnApCpsqm48GEZDLUnoOtWEZNtQvKs4_w=',
    imageAlt: 'Damn that\'s a nice basket, son.',
    description: 'Damn that\'s a nice basket, son.',
  },
]

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Ending Soon', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Minimum: Low to High', href: '#', current: false },
  { name: 'Minimum: High to Low', href: '#', current: false },
]

const subCategories = [
  { name: 'Energy', href: '#' },
  { name: 'Fintech & Finance', href: '#' },
  { name: 'Media', href: '#' },
  { name: 'Real Estate', href: '#' },
  { name: 'Technology', href: '#' },
]

const filters = [
  {
    id: 'minimum',
    name: 'Minimum Investment',
    options: [
      { value: '250', label: '250', checked: false },
      { value: '500', label: '500', checked: false },
      { value: '1000', label: '1000', checked: true },
      { value: '2500', label: '2500', checked: false },
      { value: '5000', label: '5000', checked: false },
      { value: '10000', label: '10000', checked: false },
    ],
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function OfferingLanding() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-6">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <main className="lg:col-span-8">
            <h1 className="text-3xl font-semibold leading-6 text-gray-900">
              Invest in the next big opportunity here!
            </h1>
            <h2 className="text-l mt-4 leading-6 text-gray-600">
              All companies are vetted & have passed our due dilligence process.{' '}
            </h2>
            <h2 className="text-l leading-6 text-gray-600">
              {' '}
              Click <span className="cursor-pointer text-cyan-500">
                here
              </span>{' '}
              to learn more.
            </h2>

            <div className="flex items-center justify-end">
              <Menu as="div" className="relative z-40 inline-block">
                <div className="">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <hr className="my-4" />
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {trendingRaises.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-500">
                        {product.options}
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
          <aside className="hidden sm:col-span-4 sm:block mt-36">
            <div className="sticky top-6 space-y-4">
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  var offerings = await prisma.offering.findFirst({
    where: {
      statusId: 3 // "active" status
    },
    select: {
      name: true,
      shortDescription: true,
      slug: true,
      type: true,
      goal: true,
      minimumInvestment: true,
    },
  })

  return {
    props: {
      
    },
    revalidate: 60
  }
} 