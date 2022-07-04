import { useEffect, useState } from 'react'
import {
  CheckCircleIcon,
  PaperClipIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import Header from '../../components/navigation/Header'
import useOrCreateProfile from '../../hooks/useOrCreateProfile'
import Link from 'next/link'
import { APIResponse, KYCAMLStatus } from '../../types/typings'
import KYCModal from '../../components/profile/KYCModal'
import { useKycModal } from '../../lib/zustand/investorFormStore'
import { AUTO_APPROVED } from '../../lib/consts'
import { KYCAMLInvestorFlow } from '../../components/invest/KYCAMLInvestorFlow'
import { useProfileInfoStore } from '../../lib/zustand/profileStore'
import { mapDatabaseTimestampToDateFormat } from '../../utils/mappers'
import { UpdateValue } from '../../components/profile/UpdateValue'
import { ProfileWithKycHistoryAndDocs } from '../../prisma/types'
import { useNewDocModalStore } from '../../lib/zustand/newDocModalStore'
import NewDocumentModal from '../../components/profile/NewDocumentModal'

const residenceOptions = [
  { id: 'us-citizen', title: 'U.S. Citizen' },
  { id: 'us-resident', title: 'U.S. Resident' },
  { id: 'non-resident', title: 'Non-resident' },
]

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
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-4xl lg:px-8">
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
                          {profileInfoStore.kycStatus == AUTO_APPROVED &&
                          profileInfoStore.amlStatus == AUTO_APPROVED ? (
                            <>
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              Verified account
                            </>
                          ) : (
                            <div className="flex gap-x-2">
                              <XCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                                aria-hidden="true"
                              />
                              <p>
                                <span className="font-semibold">
                                  KYC Status:{' '}
                                </span>
                                {profileInfoStore.kycStatus}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  AML Status:{' '}
                                </span>
                                {profileInfoStore.amlStatus}
                              </p>
                            </div>
                          )}
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

          <div className="flex flex-1 overflow-hidden">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto"
            >
              <h1 id="primary-heading" className="sr-only">
                Account
              </h1>

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
    </div>
  )
}
