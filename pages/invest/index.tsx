import { CheckCircleIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import DocumentModal from '../../components/invest/DocumentModal';
import SignDocuments from '../../components/invest/SignDocuments';
import { SubmitPayment } from '../../components/invest/SubmitPayment';
import Header from '../../components/navigation/Header';
import PaymentSubmittedModal from '../../components/PaymentSubmittedModal';
import useOrCreateProfile from '../../hooks/useOrCreateProfile';
import { useInvestorForm } from '../../lib/zustand/investorFormStore';
import { useNewDocModalStore } from '../../lib/zustand/newDocModalStore';
import { mapDatabaseTimestampToDateFormat } from '../../utils/mappers';

const products = [
   {
      id: 1,
      name: 'ChainRaise',
      href: '#',
      price: '$10,000',
      color: '$250/unit',
      size: 'Equity',
      imageSrc: '/chainraise_logo.png',
      imageAlt: "Front of women's basic tee in heather gray.",
   },
   // More products...
];

const tabs = [
   'Account Type',
   'Contact Information',
   'KYC/AML Verification',
   'Accreditation Status',
   'Sign Documents',
   'Payment Method',
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Invest() {
   const investorForm = useInvestorForm();
   const { profile, session, isLoading, isError } = useOrCreateProfile();
   const [tab, setTab] = useState(tabs[0]);
   const newDocModalStore = useNewDocModalStore();

   useEffect(() => {
      if (profile?.accountType) {
         investorForm.setAccountType(profile.accountType);
      }
      if (profile?.entityName) {
         investorForm.setEntityName(profile.entityName);
      }
      if (profile?.firstName) {
         investorForm.setFirstName(profile.firstName);
      }
      if (profile?.middleName) {
         investorForm.setMiddleName(profile.middleName);
      }
      if (profile?.lastName) {
         investorForm.setLastName(profile.lastName);
      }
      if (profile?.email) {
         investorForm.setEmail(profile.email);
      }
      if (profile?.phone) {
         investorForm.setPhone(profile.phone);
      }
      if (profile?.dob) {
         investorForm.setDateOfBirth(
            mapDatabaseTimestampToDateFormat(profile.dob)
         );
      }
      if (profile?.country) {
         investorForm.setCountryOfResidence(profile.country);
      }
      if (profile?.city) {
         investorForm.setCity(profile.city);
      }
      if (profile?.address1) {
         investorForm.setAddress1(profile.address1);
      }
      if (profile?.unit) {
         investorForm.setUnit(profile.unit);
      }
      if (profile?.address2) {
         investorForm.setAddress2(profile.address2);
      }
      if (profile?.state) {
         investorForm.setState(profile.state);
      }
      if (profile?.zipCode) {
         investorForm.setZipCode(profile.zipCode);
      }
      if (profile?.residence) {
         investorForm.setResidence(profile.residence);
      }
   }, [profile]);

   return (
      <>
         <PaymentSubmittedModal />
         <DocumentModal />
         <Header />
         <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
               <h1 className="sr-only">Checkout</h1>

               <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                  <main className="mx-auto w-full max-w-lg">
                     <div className="divide-y divide-gray-200 border-b border-gray-200">
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-slate-700"
                              onClick={() => setTab('Account Type')}
                           >
                              Account Type
                           </button>
                           <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
                              onClick={() => setTab('Contact Information')}
                           >
                              Contact Information
                           </button>
                           <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
                              onClick={() => setTab('KYC/AML Verification')}
                           >
                              KYC/AML Verification
                           </button>
                           <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
                              onClick={() => setTab('Accreditation Status')}
                           >
                              Accreditation Status
                           </button>
                           <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
                              onClick={() => setTab('Sign Documents')}
                           >
                              Sign Documents
                           </button>
                           {newDocModalStore.docSigned && (
                              <CheckCircleIcon className="h-8 w-8 text-green-500" />
                           )}
                        </div>
                        <div className="flex">
                           {tab == 'Sign Documents' && <SignDocuments />}
                        </div>
                        <div className="flex items-center">
                           <button
                              type="button"
                              className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
                              onClick={() => setTab('Payment Method')}
                           >
                              Payment Method
                           </button>
                        </div>
                        <div className="flex">
                           {tab == 'Payment Method' && <SubmitPayment />}
                        </div>
                     </div>
                  </main>

                  <aside className="mx-auto block w-full max-w-lg">
                     <div className="sticky">
                        <h2 className="sr-only">Order summary</h2>

                        <div className="flow-root">
                           <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                           >
                              {products.map((product) => (
                                 <li
                                    key={product.id}
                                    className="flex space-x-6 py-6"
                                 >
                                    <img
                                       src={product.imageSrc}
                                       alt={product.imageAlt}
                                       className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                                    />
                                    <div className="flex-auto">
                                       <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                                          <div className="flex-auto space-y-1 text-sm font-medium">
                                             <h3 className="text-gray-900">
                                                <a href={product.href}>
                                                   {product.name}
                                                </a>
                                             </h3>
                                             <p className="text-gray-900">
                                                {product.price}
                                             </p>
                                             <p className="hidden text-gray-500 sm:block">
                                                {product.color}
                                             </p>
                                             <p className="hidden text-gray-500 sm:block">
                                                {product.size}
                                             </p>
                                          </div>
                                          <div className="flex flex-none space-x-4">
                                             <button
                                                type="button"
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                             >
                                                Edit
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                           <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                              <dt className="text-base">Total</dt>
                              <dd className="text-base">$10,000</dd>
                           </div>
                        </dl>
                     </div>
                  </aside>
               </div>
            </div>
         </div>
      </>
   );
}
