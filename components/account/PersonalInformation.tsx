import { useForm } from 'react-hook-form'
import { ContactInformationForm } from '../../types/typings'
import { useInvestorForm } from '../../lib/zustand/investorFormStore'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { UserProfile } from '@prisma/client'

type Props = {
  userProfile: UserProfile
}

export const PersonalInformation = ({ userProfile }: Props) => {
  const investorForm = useInvestorForm()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  // https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/10
  let schema = yup.object().shape({
    firstName: yup.string().required('Please enter a first name.'),
    middleName: yup.string(),
    lastName: yup.string().required('Please emter a last name.'),
    email: yup.string().email().required('Please enter an email.'),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Please enter a valid phone number.'),
    country: yup.string().required('Please select a country.'),
    streetAddress: yup.string().required('Please enter a valid address.'),
    city: yup.string().required('Please enter a city.'),
    state: yup.string().required('Please enter a state.'),
    zipCode: yup.string().required('Please enter a zip code.'),
  })

  const {
    handleSubmit,
    register,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ContactInformationForm>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      country: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    let defaults = {
      firstName: userProfile?.firstName || '',
      middleName: userProfile?.middleName || '',
      lastName: userProfile?.lastName || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      country: userProfile?.country || '',
      streetAddress: userProfile?.address || '',
      city: userProfile?.city || '',
      state: userProfile?.state || '',
      zipCode: userProfile?.zipCode || '',
    }
    reset(defaults)
  }, [userProfile, reset])

  const onSubmit = handleSubmit((data) => {
    trigger()
    console.log(errors)
    if (
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.phoneNumber &&
      !errors.country &&
      !errors.streetAddress &&
      !errors.city &&
      !errors.zipCode &&
      !errors.state
    ) {
      investorForm.setStepNumber(2)
      investorForm.setFirstName(data.firstName)
      investorForm.setMiddleName(data.middleName)
      investorForm.setLastName(data.lastName)
      investorForm.setEmail(data.email)
      investorForm.setPhoneNumber(data.phoneNumber)
      investorForm.setCountryOfResidence(data.country)
      investorForm.setStreetAddress(data.streetAddress)
      investorForm.setCity(data.city)
      investorForm.setPostalCode(data.zipCode)
      investorForm.setState(data.state)
      console.log('bang')
    }
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
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
                      type="text"
                      {...register('phoneNumber')}
                      id="phone-number"
                      autoComplete="phone-number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.phoneNumber && (
                      <p className="mx-auto mt-2 text-sm text-red-600">
                        {errors.phoneNumber.message}
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
                      {...register('streetAddress')}
                      id="street-address"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.streetAddress && (
                      <p className="mx-auto mt-2 text-sm text-red-600">
                        {errors.streetAddress.message}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5">
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
  )
}
