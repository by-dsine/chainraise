import { useForm } from 'react-hook-form';
import { ContactInformationForm } from '../../types/typings';
import { useInvestorForm } from '../../lib/zustand/investorFormStore';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Profile } from '@prisma/client';
import {
   convertDateToSimpleString,
   mapDatabaseTimestampToDateFormat,
} from '../../utils/mappers';

const residenceOptions = [
   { id: 'us-citizen', title: 'U.S. Citizen' },
   { id: 'us-resident', title: 'U.S. Resident' },
   { id: 'non-resident', title: 'Non-resident' },
];

type Props = {
   profile: Profile;
};

export const PersonalInformation = ({ profile }: Props) => {
   const investorForm = useInvestorForm();
   const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
   // https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/10
   let schema = yup.object().shape({
      firstName: yup.string().required('Please enter a first name.'),
      middleName: yup.string(),
      lastName: yup.string().required('Please emter a last name.'),
      email: yup.string().email().required('Please enter an email.'),
      phone: yup
         .string()
         .matches(phoneRegExp, 'Phone number is not valid')
         .required('Please enter a valid phone number.'),
      country: yup.string().required('Please select a country.'),
      address1: yup.string().required('Please enter a valid address.'),
      address2: yup.string(),
      city: yup.string().required('Please enter a city.'),
      state: yup.string().required('Please enter a state.'),
      zipCode: yup.string().required('Please enter a zip code.'),
      dob: yup.string().required('Please enter a date of birth.'),
      residence: yup.string().required('Please select a residence option.'),
   });

   const {
      handleSubmit,
      register,
      reset,
      trigger,
      watch,
      formState: { errors },
   } = useForm<ContactInformationForm>({
      defaultValues: {
         firstName: '',
         middleName: '',
         lastName: '',
         email: '',
         phone: '',
         country: '',
         address1: '',
         address2: '',
         unit: '',
         city: '',
         state: '',
         zipCode: '',
         dob: '',
         residence: '',
      },
      resolver: yupResolver(schema),
   });

   useEffect(() => {
      let defaults = {
         firstName: profile?.firstName || '',
         middleName: profile?.middleName || '',
         lastName: profile?.lastName || '',
         email: profile?.email || '',
         phone: profile?.phone || '',
         country: profile?.country || '',
         address1: profile?.address1 || '',
         address2: profile?.address2 || '',
         unit: profile?.unit || '',
         city: profile?.city || '',
         state: profile?.state || '',
         zipCode: profile?.zipCode || '',
         residence: profile?.residence || '',
         dob: mapDatabaseTimestampToDateFormat(profile?.dob) || '',
      };
      reset(defaults);
   }, [profile, reset]);

   const onSubmit = handleSubmit((data) => {
      console.log('User submitted info for KYC check...');
      if (
         !errors.firstName &&
         !errors.lastName &&
         !errors.email &&
         !errors.phone &&
         !errors.country &&
         !errors.address1 &&
         !errors.address2 &&
         !errors.unit &&
         !errors.city &&
         !errors.zipCode &&
         !errors.state
      ) {
         investorForm.setFirstName(data.firstName);
         investorForm.setMiddleName(data.middleName);
         investorForm.setLastName(data.lastName);
         investorForm.setEmail(data.email);
         investorForm.setPhone(data.phone);
         investorForm.setCountryOfResidence(data.country);
         investorForm.setAddress1(data.address1);
         investorForm.setAddress2(data.address2);
         investorForm.setUnit(data.unit);
         investorForm.setResidence(data.residence);
         investorForm.setDateOfBirth(data.dob);
         investorForm.setCity(data.city);
         investorForm.setZipCode(data.zipCode);
         investorForm.setState(data.state);
         investorForm.setStepNumber(2);
         console.log('Submit successful');

         const requestBody: ContactInformationForm = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
            address1: data.address1,
            address2: data.address2,
            unit: data.unit,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            dob: data.dob,
            residence: data.residence,
         };
         const updateProfile = async () => {
            const response = await fetch('/api/profile/self', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(requestBody),
            });
         };

         updateProfile().catch(console.error);
      }
   });

   return (
      <>
         <form onSubmit={onSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
               <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                  <div>
                     <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                     </h3>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                     <div className="mt-5 md:col-span-2 md:mt-0">
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
                                 Middle name{' '}
                                 <span className="items-center text-xs">
                                    {'(optional)'}
                                 </span>
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

                           <div className="col-span-6 sm:col-span-4">
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

                           <div className="col-span-6 sm:col-span-2">
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
                                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                 autoComplete="phone-number"
                                 placeholder="123-456-7890"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              {errors.phone && (
                                 <p className="mx-auto mt-2 text-sm text-red-600">
                                    {errors.phone.message}
                                 </p>
                              )}
                           </div>

                           {investorForm.accountType == 'entity' && (
                              <div className="col-span-6">
                                 <div className="w-full border-t border-gray-300" />
                                 <h3 className="mt-4 text-lg font-medium leading-6 text-gray-900">
                                    Entity Information
                                 </h3>
                              </div>
                           )}

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

                           <div className="col-span-6 md:col-span-4">
                              <label
                                 htmlFor="street-address"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Street address
                              </label>
                              <input
                                 type="text"
                                 {...register('address1')}
                                 id="street-address"
                                 autoComplete="street-address"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              {errors.address1 && (
                                 <p className="mx-auto mt-2 text-sm text-red-600">
                                    {errors.address1.message}
                                 </p>
                              )}
                           </div>

                           <div className="col-span-6 md:col-span-2">
                              <label
                                 htmlFor="unit"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Unit
                              </label>
                              <input
                                 type="text"
                                 {...register('unit')}
                                 id="unit"
                                 autoComplete="unit"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              {errors.unit && (
                                 <p className="mx-auto mt-2 text-sm text-red-600">
                                    {errors.unit.message}
                                 </p>
                              )}
                           </div>

                           <div className="col-span-6">
                              <label
                                 htmlFor="street-address-2"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Street address 2{' '}
                                 <span className="items-center text-xs">
                                    {'(optional)'}
                                 </span>{' '}
                              </label>
                              <input
                                 type="text"
                                 {...register('address2')}
                                 id="street-address-2"
                                 autoComplete="street-address-2"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              {errors.address2 && (
                                 <p className="mx-auto mt-2 text-sm text-red-600">
                                    {errors.address2.message}
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
                                 autoComplete="city"
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
                                    {residenceOptions.map((residenceOption) => (
                                       <div
                                          key={residenceOption.id}
                                          className="flex items-center"
                                       >
                                          <input
                                             id={residenceOption.id}
                                             {...register('residence')}
                                             value={residenceOption.id}
                                             type="radio"
                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                             htmlFor={residenceOption.id}
                                             className="ml-3 block text-sm font-medium text-gray-700"
                                          >
                                             {residenceOption.title}
                                          </label>
                                       </div>
                                    ))}
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
                  </div>
               </div>
            </div>

            <div className="relative py-5">
               <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
               >
                  <div className="w-full border-t border-gray-300" />
               </div>
            </div>

            <div className="pb-10">
               <div className="flex justify-end">
                  <button
                     type="button"
                     className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                     Previous
                  </button>
                  <button
                     type="submit"
                     className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                     Next
                  </button>
               </div>
            </div>
         </form>
      </>
   );
};
