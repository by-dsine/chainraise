import { SubmitHandler, useForm } from 'react-hook-form';
import { OfferingForm } from '../../../types/typings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useNewOfferingFormStore } from '../../../lib/zustand/newOfferingStore';

export default function NewOfferingInfoForm() {
   const organizationId = useNewOfferingFormStore(
      (store) => store.organizationId
   );

   const newOfferingSchema = yup.object().shape({
      offeringName: yup.string().required('Please enter an offering name.'),
      startDate: yup.string().required('Please enter a start date.'),
      endDate: yup.string().required('Please enter an end date.'),
      targetAmount: yup.number().required('Please enter a target name.'),
      minimumAmount: yup
         .number()
         .lessThan(
            yup.ref('targetAmount'),
            'Minimum amount must be smaller than target amount.'
         )
         .required('Please enter a minimum name.'),
      maximumAmount: yup
         .number()
         .moreThan(
            yup.ref('minimumAmount'),
            'Maximum amount must be larger than minimum amount.'
         )
         .moreThan(
            yup.ref('targetAmount'),
            'Maximum amount must be larger than target amount.'
         )
         .required('Please enter a maxmium amount.'),
      issueType: yup.string().required('Please select an issue type'),
      price: yup
         .number()
         .lessThan(
            yup.ref('minimumAmount'),
            'Price per unit should probably be a little less.'
         )
         .required('Please enter a prie per unit.'),
      description: yup.string().required('Please enter a description.'),
      shortDescription: yup.string().required('Please enter a description.'),
   });

   const {
      reset,
      register,
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm<OfferingForm>({
      resolver: yupResolver(newOfferingSchema),
   });

   const onSubmit: SubmitHandler<OfferingForm> = (data) => {
      data.organizationId = organizationId;
      console.log(data);
      fetch('/api/admin/offerings/new', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            console.log(response);
            alert('Sent.');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <>
         <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
               <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                     <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Offering Information
                     </h3>
                     <p className="mt-1 text-sm text-gray-600">
                        Enter information about the offering here
                     </p>
                  </div>
               </div>
               <div className="mt-5 md:col-span-2 md:mt-0">
                  <form onSubmit={handleSubmit(onSubmit)} action="POST">
                     <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                           <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6">
                                 <label
                                    htmlFor="offering-name"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Offering Name
                                 </label>
                                 <input
                                    type="text"
                                    {...register('offeringName')}
                                    id="offering-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="start-date"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Start Date
                                 </label>
                                 <input
                                    type="date"
                                    id="start-date"
                                    {...register('startDate')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="end-date"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    End Date
                                 </label>
                                 <input
                                    type="date"
                                    id="end-date"
                                    {...register('endDate')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-2">
                                 <label
                                    htmlFor="target-amount"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Target Amount
                                 </label>
                                 <input
                                    type="number"
                                    id="target-amount"
                                    {...register('targetAmount')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-2">
                                 <label
                                    htmlFor="min-amount"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Minimum Amount
                                 </label>
                                 <input
                                    type="number"
                                    id="min-amount"
                                    {...register('minimumAmount')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-2">
                                 <label
                                    htmlFor="max-amount"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Maximum Amount
                                 </label>
                                 <input
                                    type="number"
                                    id="max-amount"
                                    {...register('maximumAmount')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                              </div>
                              {(errors.targetAmount ||
                                 errors.minimumAmount ||
                                 errors.maximumAmount) && (
                                 <div className="col-span-6 flex flex-col">
                                    {errors.targetAmount && (
                                       <p className="mx-auto text-sm text-red-600">
                                          {errors.targetAmount.message}
                                       </p>
                                    )}
                                    {errors.minimumAmount && (
                                       <p className="mx-auto text-sm text-red-600">
                                          {errors.minimumAmount.message}
                                       </p>
                                    )}
                                    {errors.maximumAmount && (
                                       <p className="mx-auto text-sm text-red-600">
                                          {errors.maximumAmount.message}
                                       </p>
                                    )}
                                 </div>
                              )}

                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Price per unit
                                 </label>
                                 <input
                                    type="number"
                                    id="price"
                                    {...register('price')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                                 {errors.price && (
                                    <p className="mx-auto text-sm text-red-600">
                                       {errors.price.message}
                                    </p>
                                 )}
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="issue-type"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Issue Type
                                 </label>
                                 <select
                                    id="Issue Type"
                                    {...register('issueType')}
                                    autoComplete="issue-type"
                                    className="mt-1 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                 >
                                    <option>Equity</option>
                                    <option>Debt</option>
                                    <option>Hybrid</option>
                                    <option>Fund</option>
                                 </select>
                                 {errors.issueType && (
                                    <p className="mx-auto text-sm text-red-600">
                                       {errors.issueType.message}
                                    </p>
                                 )}
                              </div>

                              <div className="col-span-6">
                                 <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Description
                                 </label>

                                 <input
                                    type="text"
                                    id="description"
                                    {...register('description')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                                 {errors.description && (
                                    <p className="mx-auto text-sm text-red-600">
                                       {errors.description.message}
                                    </p>
                                 )}
                              </div>

                              <div className="col-span-6">
                                 <label
                                    htmlFor="short-description"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Short Description
                                 </label>
                                 <p className="text-sm text-gray-500">
                                    This will be used for advertising cards on
                                    the website.
                                 </p>
                                 <input
                                    type="text"
                                    id="short-description"
                                    {...register('shortDescription')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                 />
                                 {errors.shortDescription && (
                                    <p className="mx-auto text-sm text-red-600">
                                       {errors.shortDescription.message}
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
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}
