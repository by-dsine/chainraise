import { SubmitHandler, useForm } from 'react-hook-form'
import { GetOrganizationForm, OfferingForm } from '../../../types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useNewOfferingFormStore } from '../../../lib/zustand/newOfferingStore'

export default function NewOrganizationInfoForm() {
  const newOfferingFormStore = useNewOfferingFormStore()

  const organizationNameSchema = yup.object().shape({
    organizationName: yup.string().required('Please enter an offering name.'),
  })

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<GetOrganizationForm>({
    resolver: yupResolver(organizationNameSchema),
  })

  const onSubmit: SubmitHandler<GetOrganizationForm> = (data) => {
    console.log("hi")
    fetch(`/api/admin/organization/${data.organizationName}`, {
      method: 'GET',
    })
      .then((response) => {
        console.log(response.json())
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <form className="col-span-6 grid-cols-6" onSubmit={handleSubmit(onSubmit)} method="GET">
        <div className="col-span-6 sm:col-span-4">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Organization name
          </label>
          <input
            type="text"
            {...register('organizationName')}
            id="organization-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.organizationName && (
            <p className="mx-auto mt-2 text-sm text-red-600">
              {errors.organizationName.message}
            </p>
          )}
        </div>
        <div className="col-span-6 self-end sm:col-span-2">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 align-middle text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Check Name
        </button>
      </div>
      </form>

      
    </>
  )
}
