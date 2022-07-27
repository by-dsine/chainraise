import { Fragment } from 'react';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
   ChevronDownIcon,
   MinusSmIcon,
   PlusSmIcon,LockClosedIcon 
} from '@heroicons/react/solid';
import {
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
} from 'next-share';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function SignIn() {
   return (
      <div className="min-h-screen bg-gray-100">
         <div className="py-6">
                 <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white py-6 px-12">
          <div>
			   <Link href="/">
				  <img
					className="mx-auto h-12 w-auto"
					 src="/chainraise_logo_black_text.png"
					 alt=""
				  />
			   </Link>
            <h2 className="mt-6 text-center text-xl font-bold text-gray-900">Sign in to your account</h2>
          </div>
			<div className=" grid grid-cols-3 gap-x-2">
				<div className="    ">
					<button className="text-center flex px-10 py-2  border border-gray-300 text-gray-900" onClick={() =>
                                          signIn('facebook', {
                                             callbackUrl: '/profile/my-info',
                                          })
                                       } >
					 <FacebookIcon size={25} round className="items-center" />
					 </button>
				</div>
				<div className="  ">
					<button className="text-center flex px-10 py-2 border border-gray-300" onClick={() =>
                                          signIn('google', {
                                             callbackUrl: '/profile/my-info',
                                          })
                                       }> <EmailIcon size={25} round />
					</button>
				</div>
				<div className="">
					<button className="text-center flex px-10 py-2 border border-gray-300 " onClick={() =>
                                          signIn('linkedin', {
                                             callbackUrl: '/profile/my-info',
                                          })
                                       }>
					 <LinkedinIcon size={25} round />
					 </button>
				</div>
			</div>
		  <div className="relative flex py-4 items-center">
				<div className="flex-grow border-t border-gray-400"></div>
					<span className="flex-shrink mx-4 text-gray-400">Or Continue with</span>
				<div className="flex-grow border-t border-gray-400"></div>
			</div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-8 space-y-6">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
         </div>
      </div>
   );
}