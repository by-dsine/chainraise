import { CheckCircleIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import DocumentModal from '../../components/invest/DocumentModal';
import SignDocuments from '../../components/invest/SignDocuments';
import { SubmitPayment } from '../../components/invest/SubmitPayment';
import Header from '../../components/navigation/Header';
import useOrCreateProfile from '../../hooks/useOrCreateProfile';
import { useInvestorForm } from '../../lib/zustand/investorFormStore';
import { mapDatabaseTimestampToDateFormat } from '../../utils/mappers';

const products = [
   {
      id: 1,
      name: "Women's Basic Tee",
      href: '#',
      price: '$32.00',
      color: 'Gray',
      size: 'S',
      imageSrc:
         'https://tailwindui.com/img/ecommerce-images/checkout-page-05-product-01.jpg',
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
         <DocumentModal />
         <Header />
         <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
               <h1 className="sr-only">Checkout</h1>

               <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                  <div className="mx-auto w-full max-w-lg">
                     {/* <form className="mt-6">
                        <h2 className="text-lg font-medium text-gray-900">
                           Contact information
                        </h2>

                        <div className="mt-6">
                           <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Email address
                           </label>
                           <div className="mt-1">
                              <input
                                 type="email"
                                 id="email-address"
                                 name="email-address"
                                 autoComplete="email"
                                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="mt-6">
                           <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Phone number
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 name="phone"
                                 id="phone"
                                 autoComplete="tel"
                                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="mt-6 flex space-x-2">
                           <div className="flex h-5 items-center">
                              <input
                                 id="terms"
                                 name="terms"
                                 type="checkbox"
                                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                           </div>
                           <label
                              htmlFor="terms"
                              className="text-sm text-gray-500"
                           >
                              I have read the terms and conditions and agree to
                              the sale of my personal information to the highest
                              bidder.
                           </label>
                        </div>

                        <button
                           type="submit"
                           disabled
                           className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                        >
                           Continue
                        </button>
                     </form> */}

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
                  </div>

                  <div className="mx-auto w-full max-w-lg">
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
                                          <div className="flex border-l border-gray-300 pl-4">
                                             <button
                                                type="button"
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                             >
                                                Remove
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>

                     <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                        <div className="flex justify-between">
                           <dt>Subtotal</dt>
                           <dd className="text-gray-900">$104.00</dd>
                        </div>
                        <div className="flex justify-between">
                           <dt>Taxes</dt>
                           <dd className="text-gray-900">$8.32</dd>
                        </div>
                        <div className="flex justify-between">
                           <dt>Shipping</dt>
                           <dd className="text-gray-900">$14.00</dd>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                           <dt className="text-base">Total</dt>
                           <dd className="text-base">$126.32</dd>
                        </div>
                     </dl>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
