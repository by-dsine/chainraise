import React, { FormEvent, useState } from 'react'

export const DeleteLink = () => {
  const [linkId, setLinkId] = useState('')

  const deleteLinkById = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    

    const deleteFunction = async () => {
      const response = await fetch(`/api/nc/link?linkId=${linkId}`, {
        method: 'POST',
      })
      console.log(await response.json())
    }
    deleteFunction().catch(console.error)
  }
  
  return (
    <div className="bg-white sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Delete a Link by ID
        </h3>

        <form
          className="mt-5 sm:flex sm:items-center"
          onSubmit={(e) => deleteLinkById(e)}
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Link
            </label>
            <input
              onChange={(event) => setLinkId(event.target.value)}
              type="number"
              name="linkId"
              id="linkId"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
