import { SubmitHandler, useForm } from 'react-hook-form'
import {
  GetOrganizationResponse,
  NewOrganizationResponse,
  OrganizationPrimaryIssuerForm,
} from '../../../types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useNewOfferingFormStore } from '../../../lib/zustand/newOfferingStore'
export default function NewOrganizationPrimaryIssuerForm() {

  const newOfferingFormStore = useNewOfferingFormStore()

  // Begin organization name and contact info functions
  const [isNewOrg, setIsNewOrg] = useState(false)
  const [nameChecked, setNameChecked] = useState(false) //TODO: add safety check- if name changed after name checked, require name check again

  const organizationPrimaryIssuerSchema = yup.object().shape({
    organizationName: yup
      .string()
      .required('Please enter an organization name.'),
    firstName: yup.string().required('Please enter a first name.'),
    lastName: yup.string().required('Please enter a last name.'),
    email: yup.string().required('Please enter a email name.'),
    phone: yup.string().required('Please enter a phone name.'),
  })

  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationPrimaryIssuerForm>({
    resolver: yupResolver(organizationPrimaryIssuerSchema),
  })

  const watchOrganizationName = watch('organizationName')

  const getOrganizationByName = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fetchData = async () => {
      const organizationName = watchOrganizationName

      console.log(`Checking to see if ${organizationName} is used...`)
      const response = await fetch(
        `/api/admin/organization/${organizationName}`,
        {
          method: 'GET',
        }
      )
      console.log(response)
      const result = (await response.json()) 
      console.log(result)

      setNameChecked(true)
      if (response.status == 404) {
        setIsNewOrg(true)
      } else if (response.status == 101) {
        newOfferingFormStore.setOrganizationId(result.organizationId)
        setIsNewOrg(false)
      }
    }
    fetchData().catch(console.error)
  }

  const onSubmit: SubmitHandler<OrganizationPrimaryIssuerForm> = (data) => {
    const fetchData = async () => {
      const response = await fetch('/api/organization/new', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      const result = (await response.json()) as NewOrganizationResponse
      console.log(result)
      if (response.status == 200) {
        newOfferingFormStore.setOrganizationId(result.organizationId)
      } else {
        console.log("Error craating new offering: {}", response.body)
      }
    }
    fetchData().catch(console.error)
  }
  // End organization name and contact info functions

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Contact Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This is the primary contact of this issuer. They will be the admin
              of the offering and the organization. These settings can be
              changed later.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
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
                      onClick={(event) => getOrganizationByName(event)}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 align-middle text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Check Name
                    </button>
                  </div>

                  {isNewOrg && (
                    <>
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
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
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {isNewOrg && (
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
