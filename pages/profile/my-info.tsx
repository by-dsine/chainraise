import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import Header from '../../components/navigation/Header'
import useOrCreateProfile from '../../hooks/useOrCreateProfile'
import Link from 'next/link'
import { APIResponse, KYCAMLStatus } from '../../types/typings'
import KYCModal from '../../components/profile/KYCModal'
import { useKycModal } from '../../lib/zustand/investorFormStore'
import { AUTO_APPROVED } from '../../lib/consts'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfilePicture } from '../../components/profile/ProfilePicture'

const residenceOptions = [
   { id: 'us-citizen', title: 'U.S. Citizen' },
   { id: 'us-resident', title: 'U.S. Resident' },
   { id: 'non-resident', title: 'Non-resident' },
];

export default function ProfilePage() {
  const { session, isLoading, isError } = useOrCreateProfile()

  const [profile, setProfile] = useState<ProfileWithKycHistoryAndDocs>()

  const profileInfoStore = useProfileInfoStore()

  const newDocModal = useNewDocModalStore()

  useEffect(() => {
    const fetchProfilePageData = async () => {
      const response = await fetch('/api/profile/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      const result =
        (await response.json()) as APIResponse<ProfileWithKycHistoryAndDocs>
      console.log(result)
      if (result.statusCode == '200') {
        setProfile(result.body)
        console.log(result.body)
      }
    }

    fetchProfilePageData().catch(console.error)
  }, [])

  // when profile comes back from hook, update display info
  useEffect(() => {
    profileInfoStore.setFirstName(profile?.firstName!)
    profileInfoStore.setMiddleName(profile?.middleName!)
    profileInfoStore.setLastName(profile?.lastName!)
    profileInfoStore.setEmail(profile?.email!)
    profileInfoStore.setPhone(profile?.phone!)
    profileInfoStore.setAddress1(profile?.address1!)
    profileInfoStore.setAddress2(profile?.address2!)
    profileInfoStore.setUnit(profile?.unit!)
    profileInfoStore.setCity(profile?.city!)
    profileInfoStore.setState(profile?.state!)
    profileInfoStore.setZipCode(profile?.zipCode!)
    profileInfoStore.setDateOfBirth(
      mapDatabaseTimestampToDateFormat(profile?.dob!)
    )
    var kycStatus: string = ''
    var amlStatus: string = ''

    if (profile?.userKYCAML.length) {
      kycStatus = profile.userKYCAML[0].kycStatus || ''
      amlStatus = profile.userKYCAML[0].amlStatus || ''
    }

    if (!kycStatus || kycStatus == '') {
      kycStatus = 'Not Started'
    }

    if (!amlStatus || amlStatus == '') {
      amlStatus = 'Not Started'
    }

    profileInfoStore.setKycStatus(kycStatus)
    profileInfoStore.setAmlStatus(amlStatus)
  }, [profile])

  const changeProfilePic = (e: React.MouseEvent<HTMLButtonElement>): void => {

  }

  return (
    <div className="min-h-full">
      {newDocModal.modalOpen && <NewDocumentModal />}
      {profileInfoStore.kycStatus && (
        <KYCModal kycStatus={profileInfoStore.kycStatus} />
      )}
      <Header />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 pb-8 ">
          {/* Page header */}
          <ProfileHeader />
          <div className="mt-8">
            <div className="mx-4 rounded-md pt-4 shadow sm:mx-6 lg:mx-auto lg:max-w-6xl">
              <ProfilePicture />
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

              <div className="bg-white px-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Account Information
                  </h3>
                </div>
                <div className="mt-5 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <UpdateValue
                      displayName="First Name"
                      storeName="firstName"
                    />
                    <UpdateValue
                      displayName="Middle Name"
                      storeName="middleName"
                    />
                    <UpdateValue displayName="Last Name" storeName="lastName" />
                    <UpdateValue displayName="Phone" storeName="phone" />
                    <UpdateValue displayName="Address 1" storeName="address1" />
                    <UpdateValue displayName="Address 2" storeName="address2" />
                    <UpdateValue displayName="Unit" storeName="unit" />
                    <UpdateValue displayName="City" storeName="city" />
                    <UpdateValue displayName="State" storeName="state" />
                  </dl>
                </div>
              </div>
            </section>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden lg:mr-2 lg:block lg:flex-shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-white">
                <div className="border-b border-gray-200 pb-2 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Documents
                  </h3>
                  <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <button
                      onClick={() => newDocModal.setModalOpen(true)}
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex py-4">
                  <dd className="mt-1 w-full text-sm text-gray-900 sm:mt-0">
                    {profile?.documents.length ? (
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        {profile.documents.map((document) => (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 w-0 flex-1 truncate">
                                {document.name}
                              </span>
                            </div>
                            <div className="ml-4 flex flex-shrink-0 space-x-4">
                              <button
                                type="button"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              form_c.pdf
                            </span>
                          </div>
                          <div className="ml-4 flex flex-shrink-0 space-x-4">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              articles.pdf
                            </span>
                          </div>
                          <div className="ml-4 flex flex-shrink-0 space-x-4">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      <div>No documents!</div>
                    )}
                  </dd>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
   );
}


