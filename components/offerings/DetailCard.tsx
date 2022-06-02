/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function DetailCard() {
  return (
    <div>
      <div className="flex mx-4">
        <h1 className="font-bold text-xl text-cr-primary pr-2">$2,500,000</h1>
        <h1 className="font-semibold text-lg">raised</h1>
      </div>

      {/* Progress Bar */}
      <div className="mx-4 py-2 my-2 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700">
        {/* <div className="w-1/2 h-2.5 rounded-full bg-blue-600"></div> */}
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        <li key="target-raise" className="w-full py-4">
          <div className="ml-3 grid grid-cols-2 items-center gap-4">
            <p className="col-span-1 text-lg font-medium text-gray-900">
              Target Raise
            </p>
            <p className="col-span-1 text-xl text-gray-500">$4.5M</p>
          </div>
        </li>
        <li key="minimum-investment" className="w-full py-4">
          <div className="ml-3 grid grid-cols-2 items-center gap-4">
            <p className="col-span-1 text-lg font-medium text-gray-900">
              Min. Investment
            </p>
            <p className="col-span-1 text-xl text-gray-500">$1000</p>
          </div>
        </li>
        <li key="price-per" className="w-full py-4">
          <div className="ml-3 grid grid-cols-2 items-center gap-4">
            <p className="col-span-1 text-lg font-medium text-gray-900">
              Price per unit
            </p>
            <p className="col-span-1 text-xl text-gray-500">$500</p>
          </div>
        </li>
        <li key="offering-type" className="w-full py-4">
          <div className="ml-3 grid grid-cols-2 items-center gap-4">
            <p className="col-span-1 text-lg font-medium text-gray-900">
              Offering Type
            </p>
            <p className="col-span-1 text-xl text-gray-500">Reg CF</p>
          </div>
        </li>
      </ul>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Invest
        </button>
      </div>
    </div>
  )
}
