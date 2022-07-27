import { LockClosedIcon } from '@heroicons/react/solid';
import { signIn } from 'next-auth/react';
import { EmailIcon, FacebookIcon, LinkedinIcon } from 'next-share';
import Link from 'next/link';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function SignIn() {
   return (
      <div className="min-h-screen bg-gray-100">
         <div className="py-6">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
               <div className="w-full max-w-md space-y-8 bg-white py-6 px-12">
                  <div>
                     <Link href="/">
                        <img
                           className="mx-auto h-12 w-auto"
                           src="/chainraise_logo_black_text.png"
                           alt=""
                        />
                     </Link>
                     <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
                        Sign in to your account
                     </h2>
                  </div>
                  <div className=" grid grid-cols-3 gap-x-2">
                     <div className="    ">
                        <button
                           className="flex border border-gray-300 px-10  py-2 text-center text-gray-900"
                           onClick={() =>
                              signIn('facebook', {
                                 callbackUrl: '/profile/my-info',
                              })
                           }
                        >
                           <FacebookIcon
                              size={25}
                              round
                              className="items-center"
                           />
                        </button>
                     </div>
                     <div className="  ">
                        <button
                           className="flex border border-gray-300 px-10 py-2 text-center"
                           onClick={() =>
                              signIn('google', {
                                 callbackUrl: '/profile/my-info',
                              })
                           }
                        >
                           {' '}
                           <EmailIcon size={25} round />
                        </button>
                     </div>
                     <div className="">
                        <button
                           className="flex border border-gray-300 px-10 py-2 text-center "
                           onClick={() =>
                              signIn('linkedin', {
                                 callbackUrl: '/profile/my-info',
                              })
                           }
                        >
                           <LinkedinIcon size={25} round />
                        </button>
                     </div>
                  </div>
                  <div className="relative flex items-center py-4">
                     <div className="flex-grow border-t border-gray-400"></div>
                     <span className="mx-4 flex-shrink text-gray-400">
                        Or Continue with
                     </span>
                     <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <form className="mt-8 space-y-6" action="#" method="POST">
                     <input type="hidden" name="remember" defaultValue="true" />
                     <div className="-space-y-px rounded-md shadow-sm">
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
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                           />
                           <label
                              htmlFor="remember-me"
                              className="ml-2 block text-sm text-gray-900"
                           >
                              Remember me
                           </label>
                        </div>

                        <div className="text-sm">
                           <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                           >
                              Forgot your password?
                           </a>
                        </div>
                     </div>

                     <div>
                        <button
                           type="submit"
                           className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon
                                 className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                 aria-hidden="true"
                              />
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
