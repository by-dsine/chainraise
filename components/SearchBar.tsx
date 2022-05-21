import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

export default function SearchBar() {
  return (
    <section aria-labelledby="search-bar">
      <h2 className="sr-only" id="search-bar">
        Search Bar
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          {/* Search */}
          <div className="min-w-0 flex-1 px-2">
            <div className="mx-auto w-full max-w-xs">
              <label htmlFor="desktop-search" className="sr-only">
                Search Bar
              </label>
              <div className="relative text-black focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="desktop-search"
                  className="block w-full rounded-md border border-gray-300 bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
