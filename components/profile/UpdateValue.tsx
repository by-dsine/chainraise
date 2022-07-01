import React, { useState } from 'react'
import {
  ProfileInfoStore,
  useProfileInfoStore,
} from '../../lib/zustand/profileStore'
import { useRouter } from 'next/router'
import { APIResponse } from '../../types/typings'
import { Profile } from '@prisma/client'

type Props = {
  displayName: string
  storeName: string
}

export const UpdateValue = ({ displayName, storeName }: Props) => {
  const [toggle, setToggle] = useState(true)
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const router = useRouter()

  const profile = useProfileInfoStore()

  type ProfileKeys = keyof ProfileInfoStore

  const handleSubmit = async () => {
    if (!input) {
      setInputError('No input detected!')
    }

    const data = new URLSearchParams()
    data.append(storeName, input)

    // go to /api/profile/update?storeName=input
    const response = await fetch('/api/profile/update?' + data.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = (await (response.json())) as APIResponse<Profile>
    console.log(result)
   

    // if response is good, reload component by changing investor form

    setToggle(true)
    
  }

  return (
    <>
      {(typeof profile[storeName as ProfileKeys] == 'string' || !profile[storeName as ProfileKeys])&& (
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">{displayName}</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {toggle ? (
              <>
                <span
                  className="flex-grow"
                  onDoubleClick={() => {
                    setToggle(false)
                  }}
                >
                  {/* We know this works but Typescript gets spooked 
              @ts-ignore */}
                  {profile[storeName as string] as string}
                </span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => setToggle(false)}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </span>
              </>
            ) : (
              <>
                {/* @ts-ignore */}
                <input placeholder={profile[storeName as string] as string}
                  className="focus:none flex-grow ring ring-offset-4"
                  onChange={(e) => setInput(e.target.value)}
                >
                  {}
                </input>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </span>
              </>
            )}
          </dd>
        </div>
      )}
    </>
  )
}
