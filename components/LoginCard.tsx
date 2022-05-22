import React from 'react'
import { signIn, useSession } from 'next-auth/react'

export default function LoginCard() {
  return (
    <div className="border border-stone-900 bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10 ">
        <div>
          <p className="text-sm font-medium">Sign in with</p>

          <div className="mt-1 grid grid-cols-2 gap-3">
            <div>
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="inline-flex w-full justify-center rounded-md border border-stone-900 bg-white py-2 px-4 text-sm font-medium text-stone-900 shadow-sm hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  {' '}
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-900" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-stone-900">Or</span>
          </div>
        </div>

        <div className="mt-6">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Full name"
                required
                className="block w-full rounded-md border-stone-900 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="mobile-or-email" className="sr-only">
                Mobile number or email
              </label>
              <input
                type="text"
                name="mobile-or-email"
                id="mobile-or-email"
                autoComplete="email"
                placeholder="Mobile number or email"
                required
                className="block w-full rounded-md border-stone-900 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-stone-900 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-stone-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create your account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t-2 border-gray-200 bg-gray-50 px-4 py-6 sm:px-10">
        <p className="text-xs leading-5 text-stone-900">
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-gray-900 hover:underline">
            Terms
          </a>
          ,{' '}
          <a href="#" className="font-medium text-gray-900 hover:underline">
            Data Policy
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-gray-900 hover:underline">
            Cookies Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
