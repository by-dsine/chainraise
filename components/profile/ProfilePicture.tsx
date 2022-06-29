import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProfilePictureForm } from '../../types/typings'

export const ProfilePicture = () => {
  const [newProfilePicPath, setNewProfilePicPath] = useState('')

  const [isLoading, setIsLoading] = React.useState(false)
  const inputFileRef = React.useRef<HTMLInputElement | null>(null)

  const updatePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target?.files){
      setNewProfilePicPath(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    /* Prevent form from submitting by default */
    e.preventDefault()

    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert('Please, select file you want to upload')
      return
    }

    setIsLoading(true)

    /* Add files to FormData */
    const formData = new FormData()
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append('file', file)
    })

    /* Send request to our api route */
    const response = await fetch('/api/profile/profilePic', {
      method: 'POST',
      body: formData,
    })

    const body = (await response.json()) as {
      status: 'ok' | 'fail'
      message: string
    }

    alert(body.message)

    if (body.status === 'ok') {
      inputFileRef.current.value = ''
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false)
    setNewProfilePicPath('')
  }

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
        <div className="flex">
          <input type="file" name="myfile" ref={inputFileRef} onChange={(e) => updatePreview(e)} />
          {newProfilePicPath && (
            <>
              <img
                className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
                src={newProfilePicPath}
                alt=""
              />
              <button
                onClick={() => setNewProfilePicPath('')}
                type="button"
                className="my-1.5 flex items-center rounded border border-transparent bg-cr-primary px-2.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              {!isLoading && (
                <button
              onClick={(e) => handleOnClick(e)}
                type="submit"
                className="my-1.5 flex items-center rounded border border-transparent bg-cr-primary px-2.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
              )}
              
            </>
          )}
        </div>
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
