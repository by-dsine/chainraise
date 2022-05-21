import React from 'react'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { UserPanel } from '../../components/UserPanel'
import { Feed } from '../../components/Feed'
import QuickPost from '../../components/QuickPost'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function index() {
  return (
      <div className="relative overflow-hidden bg-white">
        <Header />
        <main className="pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">My Feed</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <QuickPost />
                <UserPanel />
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <Feed />
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}
