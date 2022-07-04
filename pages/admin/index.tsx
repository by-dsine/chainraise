import { useEffect, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, UserGroupIcon } from '@heroicons/react/solid';
import Header from '../../components/navigation/Header';
import useOrCreateProfile from '../../hooks/useOrCreateProfile';
import { CRAdminStatistics, DisplayAdminInfo } from '../../types/typings';
import UsersTable from '../../components/admin/UsersTable';
import { useDisplayStore } from '../../lib/zustand/displayAdminStore';
import OfferingsTable from '../../components/admin/OfferingsTable';

export default function AdminPage() {
   const { profile, session, isLoading, isError } = useOrCreateProfile();

   const addUserToDisplayTable = useDisplayStore(
      (store) => store.addDisplayUser
   );
   const addOfferingToDisplayTable = useDisplayStore(
      (store) => store.addDisplayOffering
   );

   const [numOfferings, setNumOfferings] = useState(0);
   const [numUsers, setNumUsers] = useState(0);
   const [table, setTable] = useState('Offerings');

   useEffect(() => {
      const fetchStatsData = async () => {
         const response = await fetch('api/statistics/admin', {
            method: 'GET',
            headers: {
               Accept: 'application/json',
            },
         });

         const result = (await response.json()) as CRAdminStatistics;
         setNumUsers(result.userCount);
         setNumOfferings(result.offeringsCount);
         console.log('Admin stats received: ', result);
      };
      fetchStatsData().catch(console.error);

      const fetchUserData = async () => {
         const response = await fetch('/api/admin/display', {
            method: 'GET',
            headers: {
               Accept: 'application/json',
            },
         });

         const result = (await response.json()) as DisplayAdminInfo;
         const offerings = result.offerings;
         const users = result.users;

         users?.forEach((userForDisplay) => {
            addUserToDisplayTable(userForDisplay);
         });

         offerings?.forEach((offeringForDisplay) => {
            addOfferingToDisplayTable(offeringForDisplay);
         });
      };
      fetchUserData().catch(console.error);
   }, []);

   const seedDatabase = () => {
      const seedPost = async () => {
         await fetch('api/admin/seed', {
            method: 'POST',
         });
      };
      seedPost().catch(console.error);
   };

   const cards = [
      {
         name: 'Offerings',
         icon: CurrencyDollarIcon,
         amount: numOfferings,
      },
      { name: 'Users', icon: UserGroupIcon, amount: numUsers },
   ];

   return (
      <div className="min-h-full">
         <Header />
         <div className="flex flex-1 flex-col">
            <main className="flex-1 pb-8">
               {/* Page header */}
               <div className="bg-white shadow">
                  <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                     <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <div className="min-w-0 flex-1">
                           {/* Profile */}
                           <div className="flex items-center">
                              <div>
                                 <div className="flex items-center">
                                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                       Welcome to ChainRaise
                                       {', ' + profile?.username ||
                                          ', ' + profile?.firstName ||
                                          '!'}
                                    </h1>
                                 </div>
                                 <dl className="group mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                    <dt className="sr-only">Account status</dt>
                                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 group-hover:opacity-10 sm:mr-6 sm:mt-0">
                                       <CheckCircleIcon
                                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                          aria-hidden="true"
                                       />
                                       Verified account
                                    </dd>
                                    <dt className="sr-only">KYC/AML status</dt>
                                    <dd className="mt-3 hidden items-center text-sm font-medium capitalize text-gray-500 group-hover:flex sm:mr-6 sm:mt-0">
                                       <CheckCircleIcon
                                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                          aria-hidden="true"
                                       />
                                       KYC/AML Verified
                                    </dd>
                                    <dt className="sr-only">
                                       Accreditation Status
                                    </dt>
                                    <dd className="mt-3 hidden items-center  text-sm font-medium capitalize text-gray-500 group-hover:flex sm:mr-6 sm:mt-0">
                                       <CheckCircleIcon
                                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                          aria-hidden="true"
                                       />
                                       No Accreditation Required
                                    </dd>
                                 </dl>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                  <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                     <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Overview
                     </h2>
                     <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card */}
                        {cards.map((card) => (
                           <div
                              key={card.name}
                              className="rounded-lg bg-white shadow"
                           >
                              <div className="p-5">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                       <card.icon
                                          className="h-6 w-6 text-gray-400"
                                          aria-hidden="true"
                                       />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                       <dl>
                                          <dt className="truncate text-sm font-medium text-gray-500">
                                             {card.name}
                                          </dt>
                                          <dd>
                                             <div className="text-lg font-medium text-gray-900">
                                                {card.amount}
                                             </div>
                                          </dd>
                                       </dl>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 px-5 py-3">
                                 <div className="text-sm">
                                    <button
                                       className="font-medium text-cyan-700 hover:text-cyan-900"
                                       onClick={() => setTable(card.name)}
                                    >
                                       View all
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
                     {(() => {
                        switch (table) {
                           case 'Users':
                              return <UsersTable />;
                           case 'Offerings':
                              return <OfferingsTable />;
                           default:
                              return null;
                        }
                     })()}
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}
