import React from 'react';

export default function DealTerms() {
   return (
      <div>
         <div className="mx-3 flex">
            <h1 className="text-l pr-2 font-bold text-gray-500">
               Deal Summary
            </h1>
         </div>
         <hr className="my-2 ml-2 w-1/3" />
         <ul role="list">
            <li key="target-raise" className="w-full py-4">
               <div className="ml-3 grid grid-cols-2 items-center gap-4">
                  <p className="text-m col-span-1 font-medium text-gray-900">
                     Funding Goal
                  </p>
                  <p className="text-l col-span-1 text-gray-500">$4.5M</p>
               </div>
            </li>
            <li key="minimum-investment" className="w-full py-4">
               <div className="ml-3 grid grid-cols-2 items-center gap-4">
                  <p className="text-m col-span-1 font-medium text-gray-900">
                     Security Type
                  </p>
                  <p className="text-l col-span-1 text-gray-500">Crowd SAFE</p>
               </div>
            </li>
            <li key="price-per" className="w-full py-4">
               <div className="ml-3 grid grid-cols-2 items-center gap-4">
                  <p className="text-m col-span-1 font-medium text-gray-900">
                     Minimum Investment
                  </p>
                  <p className="text-l col-span-1 text-gray-500">$1000</p>
               </div>
            </li>
            <li key="offering-type" className="w-full py-4">
               <div className="ml-3 grid grid-cols-2 items-center gap-4">
                  <p className="text-m col-span-1 font-medium text-gray-900">
                     Deadline
                  </p>
                  <p className="text-l col-span-1 text-gray-500">
                     May 04, 2021
                  </p>
               </div>
            </li>
         </ul>
         <hr className="my-2" />
      </div>
   );
}
