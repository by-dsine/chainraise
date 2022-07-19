const people = [
   {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@example.com',
      role: 'Member',
   },
   // More people...
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}
export const ManageTab = () => {
   return (
      <>
         <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
               <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                     <h2 className="sr-only" id="profile-overview-title">
                        Team Members
                     </h2>
                     <div className="bg-white p-6">
                        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                           <div className="sm:col-span-6">
                              <label
                                 htmlFor="about"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Thank You Message
                              </label>
                              <div className="mt-1">
                                 <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={''}
                                 />
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                 This message will be shown to the investor
                                 after they initiate payment to your offerings.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </>
   );
};
