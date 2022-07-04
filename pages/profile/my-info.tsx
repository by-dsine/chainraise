import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Header from '../../components/navigation/Header';
import useOrCreateProfile from '../../hooks/useOrCreateProfile';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KYCAMLStatus, PersonalInformationForm } from '../../types/typings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import KYCModal from '../../components/profile/KYCModal';
import { useKycModal } from '../../lib/zustand/investorFormStore';
import { AUTO_APPROVED } from '../../lib/consts';

const residenceOptions = [
   { id: 'us-citizen', title: 'U.S. Citizen' },
   { id: 'us-resident', title: 'U.S. Resident' },
   { id: 'non-resident', title: 'Non-resident' },
];

export default function ProfilePage() {
   const [kycStatus, setKycStatus] = useState('');
   const { profile, session, isLoading, isError } = useOrCreateProfile();
   const kycModal = useKycModal();
   const [isKycDone, setKycDone] = useState(false);

   const contactInfoSchema = yup.object().shape({
      firstName: yup.string().required('Please enter a first name.'),
      middleName: yup.string(),
      lastName: yup.string().required('Please enter a last name.'),
      email: yup.string().email().required('Please enter a valid email.'),
      phone: yup.string().required('Please enter a valid phone number.'),
      country: yup.string().required('Please select a country.'),
      address: yup
         .string()
         .required('Please enter your legal mailing address.'),
      city: yup.string().required('Please enter a city name.'),
      state: yup.string().required('Please enter a state.'),
      zipCode: yup.string().required('Please enter a zip code.'),
      dob: yup.string().required('Please enter a date of birth.'),
      residence: yup.string().required('Please select a residence option.'),
   });

   const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<PersonalInformationForm>({
      defaultValues: {
         firstName: '',
         middleName: '',
         lastName: '',
         address: '',
         city: '',
         state: '',
         country: '',
         zipCode: '',
         email: '',
         phone: '',
         dob: '',
         residence: '',
      },
      resolver: yupResolver(contactInfoSchema),
   });

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('/api/nc/kyc', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
            },
         });
         const result = (await response.json()) as KYCAMLStatus;
         setKycStatus(result.kycStatus);
         setKycDone(result.kycStatus == AUTO_APPROVED);
      };

      fetchData().catch(console.error);
   }, []);

   useEffect(() => {
      console.log('profile, ', profile);
      let defaults = {
         firstName: profile?.firstName || '',
         middleName: profile?.middleName || '',
         lastName: profile?.lastName || '',
         address: profile?.address1 || '',
         city: profile?.city || '',
         state: profile?.state || '',
         country: profile?.country || '',
         zipCode: profile?.zipCode || '',
         email: profile?.email || '',
         phone: profile?.phone || '',
      };
      reset(defaults);
   }, [profile, reset]);

   const onSubmit: SubmitHandler<PersonalInformationForm> = (data) => {
      fetch('/api/profile/updateProfile', {
         method: 'POST',
         body: JSON.stringify(data),
      })
         .then(() => {
            alert('Sent.');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div className="min-h-full">
         {kycStatus && <KYCModal kycStatus={kycStatus} />}
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
                                    </h1>
                                 </div>
                                 <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                    <dt className="sr-only">Account status</dt>
                                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                       <CheckCircleIcon
                                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                          aria-hidden="true"
                                       />
                                       Verified account
                                    </dd>
                                 </dl>
                              </div>
                           </div>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                           <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                           >
                              Update Profile Information
                           </button>
                           <Link href="/profile">
                              <button
                                 type="button"
                                 className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                              >
                                 View Account Summary
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                  <div className="mx-4 rounded-md pt-4 shadow sm:mx-6 lg:mx-auto lg:max-w-6xl">
                     <div className="px-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                           Personal Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                           Personal details and contact information.
                        </p>
                     </div>
                     <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                           <div className="mt-10 md:col-span-3 md:mt-0">
                              <form
                                 onSubmit={handleSubmit(onSubmit)}
                                 action="#"
                                 method="POST"
                              >
                                 <div className="overflow-hidden sm:rounded-md">
                                    <div className="bg-white py-5 px-4">
                                       <div className="grid grid-cols-6 gap-6">
                                          <div className="col-span-6 sm:col-span-2">
                                             <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                First name
                                             </label>
                                             <input
                                                type="text"
                                                {...register('firstName')}
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.firstName && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.firstName.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-2">
                                             <label
                                                htmlFor="middle-name"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Middle name
                                             </label>
                                             <input
                                                type="text"
                                                {...register('middleName')}
                                                id="middle-name"
                                                autoComplete="middle-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.middleName && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.middleName.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-2">
                                             <label
                                                htmlFor="last-name"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Last name
                                             </label>
                                             <input
                                                type="text"
                                                {...register('lastName')}
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.lastName && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.lastName.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                             <label
                                                htmlFor="email-address"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Email address
                                             </label>
                                             <input
                                                type="text"
                                                {...register('email')}
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.email && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.email.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                             <label
                                                htmlFor="phone-number"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Phone Number
                                             </label>
                                             <input
                                                type="tel"
                                                {...register('phone')}
                                                id="phone-number"
                                                autoComplete="telephone"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.phone && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.phone.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                             <label
                                                htmlFor="country"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Country
                                             </label>
                                             <select
                                                id="country"
                                                {...register('country')}
                                                autoComplete="country-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                             >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                             </select>
                                             {errors.country && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.country.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6">
                                             <label
                                                htmlFor="street-address"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Street address
                                             </label>
                                             <input
                                                type="text"
                                                {...register('address')}
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.address && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.address.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                             <label
                                                htmlFor="city"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                City
                                             </label>
                                             <input
                                                type="text"
                                                {...register('city')}
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.city && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.city.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                             <label
                                                htmlFor="region"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                State / Province
                                             </label>
                                             <input
                                                type="text"
                                                {...register('state')}
                                                id="region"
                                                autoComplete="address-level1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.state && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.state.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                             <label
                                                htmlFor="postal-code"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                ZIP / Postal code
                                             </label>
                                             <input
                                                type="text"
                                                {...register('zipCode')}
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.zipCode && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.zipCode.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                             <label
                                                htmlFor="region"
                                                className="block text-sm font-medium text-gray-700"
                                             >
                                                Date of Birth
                                             </label>
                                             <input
                                                type="date"
                                                {...register('dob')}
                                                id="dob"
                                                autoComplete="address-level1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             />
                                             {errors.dob && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.dob.message}
                                                </p>
                                             )}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                             <label className=" text-sm font-medium text-gray-700">
                                                Residence
                                             </label>
                                             <fieldset className="mt-4">
                                                <legend className="sr-only">
                                                   Notification method
                                                </legend>
                                                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                                   {residenceOptions.map(
                                                      (residenceOption) => (
                                                         <div
                                                            key={
                                                               residenceOption.id
                                                            }
                                                            className="flex items-center"
                                                         >
                                                            <input
                                                               id={
                                                                  residenceOption.id
                                                               }
                                                               {...register(
                                                                  'residence'
                                                               )}
                                                               value={
                                                                  residenceOption.id
                                                               }
                                                               type="radio"
                                                               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                               htmlFor={
                                                                  residenceOption.id
                                                               }
                                                               className="ml-3 block text-sm font-medium text-gray-700"
                                                            >
                                                               {
                                                                  residenceOption.title
                                                               }
                                                            </label>
                                                         </div>
                                                      )
                                                   )}
                                                </div>
                                             </fieldset>
                                             {errors.residence && (
                                                <p className="mx-auto mt-2 text-sm text-red-600">
                                                   {errors.residence.message}
                                                </p>
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                       <button
                                          type="submit"
                                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                       >
                                          Save
                                       </button>

                                       {!isKycDone && (
                                          <button
                                             type="button"
                                             className="ml-2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cr-primary focus:ring-offset-2"
                                             onClick={() =>
                                                kycModal.setIsOpen(true)
                                             }
                                          >
                                             Complete KYC
                                          </button>
                                       )}
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}
