import { signIn } from 'next-auth/react';
import Image from 'next/image';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function SignIn() {
   return (
      <>
         <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <img
                  className="mx-auto h-12 w-auto"
                  src="/chainraise_logo.png"
                  alt="Workflow"
               />
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
               </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" action="#" method="POST">
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Email address
                        </label>
                        <div className="mt-1">
                           <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           />
                        </div>
                     </div>

                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Password
                        </label>
                        <div className="mt-1">
                           <input
                              id="password"
                              name="password"
                              type="text"
                              autoComplete="password"
                              required
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                           className="flex w-full justify-center rounded-md border border-transparent bg-cr-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                           Sign in
                        </button>
                     </div>
                  </form>

                  <div className="mt-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="bg-white px-2 text-gray-500">
                              Or continue with
                           </span>
                        </div>
                     </div>

                     <div className="mt-6 grid grid-cols-3 gap-3">
                        <div>
                           <a
                              onClick={() =>
                                 signIn('facebook', {
                                    callbackUrl: '/profile/my-info',
                                 })
                              }
                              href="#"
                              className="group inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with Facebook
                              </span>
                              <div className="relative h-5 w-5">
                                 <Image
                                    className="grayscale group-hover:grayscale-0"
                                    src="/facebook.png"
                                    alt="facebook logo"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                 />
                              </div>
                           </a>
                        </div>

                        <div>
                           <a
                              onClick={() =>
                                 signIn('linkedin', {
                                    callbackUrl: '/profile/my-info',
                                 })
                              }
                              href="#"
                              className="group inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with LinkedIn
                              </span>
                              <div className="relative h-5 w-5">
                                 <Image
                                    className="grayscale group-hover:grayscale-0"
                                    src="/linkedin.png"
                                    alt="linkedin logo"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                 />
                              </div>
                           </a>
                        </div>

                        <div>
                           <a
                              onClick={() =>
                                 signIn('google', {
                                    callbackUrl: '/profile/my-info',
                                 })
                              }
                              href="#"
                              className="group inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with Google
                              </span>
                              <div className="relative h-5 w-5">
                                 <Image
                                    className="grayscale group-hover:grayscale-0"
                                    src="/google.jpg"
                                    alt="google logo"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                 />
                              </div>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* <div className="my-4 bg-white py-2 px-4 shadow sm:rounded-lg sm:px-10">
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                     Psst... are you new here?
                  </h3>
                  <div>
                     <button
                        type="submit"
                        className="my-2 flex w-full justify-center rounded-md border border-transparent bg-cr-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:ring-1 hover:ring-cr-secondary hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-cr-secondary focus:ring-offset-2"
                     >
                        Create a new account
                     </button>
                  </div>
               </div> */}
            </div>
         </div>
      </>
   );
}
