import React from 'react';
import Header from '../../components/navigation/Header';
import { Feed } from '../../components/feed/Feed';
import { useSession } from 'next-auth/react';
import QuickPost from '../../components/feed/QuickPost';
import { UserPanel } from '../../components/feed/UserPanel';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function index() {
   const { data: session } = useSession();

   return (
      <div className="relative overflow-hidden bg-white">
         <Header />
         <main className="pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
               <h1 className="sr-only">My Feed</h1>
               {/* Main 3 column grid */}
               <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                  <div className="grid grid-cols-1 gap-4">
                     {session && (
                        <>
                           <QuickPost />
                           <UserPanel />
                        </>
                     )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                     <Feed />
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}
