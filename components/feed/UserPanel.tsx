import { useSession } from 'next-auth/react';
import React from 'react';

const user = {
   name: 'Quimby Ingmeen ',
   email: 'quimby.ingmeen@example.com',
   role: 'Link Member',
   imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export function UserPanel() {
   const { data: session } = useSession();

   return (
      <section aria-labelledby="profile-overview-title">
         <div className="overflow-hidden rounded-lg bg-white shadow">
            <h2 className="sr-only" id="profile-overview-title">
               Profile Overview
            </h2>
            <div className="bg-white p-6">
               <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                     <div className="flex-shrink-0">
                        <img
                           className="mx-auto h-20 w-20 rounded-full"
                           src={session?.user?.image || '/logomark.png'}
                           alt=""
                        />
                     </div>
                     <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">
                           Welcome back,
                        </p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                           {session?.user.name}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                           {user.role}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex justify-center pb-5 sm:mt-0">
               <a
                  href="/profile"
                  className="flex w-3/4 items-center justify-center rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
               >
                  View profile
               </a>
            </div>
            <div className="flex justify-center pb-5 sm:mt-0">
               <a
                  href="/earn"
                  className="flex w-3/4 items-center justify-center rounded-md border border-gray-300 bg-cr-secondary py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50"
               >
                  Earn RAISER
               </a>
            </div>
         </div>
      </section>
   );
}
