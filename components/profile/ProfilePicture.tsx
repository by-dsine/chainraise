import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProfilePictureForm } from '../../types/typings'

export const ProfilePicture = () => {
  const [newProfilePic, setNewProfilePic] = useState('')

  const { register, handleSubmit } = useForm<ProfilePictureForm>()

  const changeProfilePic = (e: React.MouseEvent<HTMLButtonElement>): void => {}

  return (
    <div>
      <div className="px-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Personal Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and contact information.
        </p>
      </div>
      <div className="mt-4 px-4">
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-gray-700"
        >
          Photo
        </label>
        <input
          {...register('fileName', {
            onChange: (e) => {
              if (e.target.files.length > 0) {
                const input = e.target as HTMLInputElement
                if(!input || !input.files){
                  return false
                }
                // Update UI to show file is uploading
                const file = input.files[0]
                console.log(file)
                setNewProfilePic(file.name)
                console.log(file.name)
              }
            },
          })}
          type="file"
        />
        {/* <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="flex items-center">
            <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              onClick={(e) => changeProfilePic(e)}
              type="button"
              className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
