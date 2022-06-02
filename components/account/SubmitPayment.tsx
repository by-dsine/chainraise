import React from 'react'
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'wire', title: 'wire' },
]
export const SubmitPayment = () => {
  return (
    <>
      {/* Payment */}
      <div className='-pt-10'>
        <h2 className="text-lg font-medium text-gray-900">Payment</h2>

        <fieldset className="mt-4">
          <legend className="sr-only">Payment type</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
              <div key={paymentMethod.id} className="flex items-center">
                {paymentMethodIdx === 0 ? (
                  <input
                    id={paymentMethod.id}
                    name="payment-type"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    id={paymentMethod.id}
                    name="payment-type"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                )}

                <label
                  htmlFor={paymentMethod.id}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {paymentMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
          <div className="col-span-4">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card number
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="card-number"
                name="card-number"
                autoComplete="cc-number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-4">
            <label
              htmlFor="name-on-card"
              className="block text-sm font-medium text-gray-700"
            >
              Name on card
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name-on-card"
                name="name-on-card"
                autoComplete="cc-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="expiration-date"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration date (MM/YY)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                autoComplete="cc-exp"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700"
            >
              CVC
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="cvc"
                id="cvc"
                autoComplete="csc"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
