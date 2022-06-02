/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

type setting = {
  name: string
  description: string
}

const settings = [
  {
    name: 'Individual',
    description: 'You represent yourself. Good for you. Carpe those diems.',
  },
  {
    name: 'Entity',
    description:
      "You're investing for an entity or organization such as a Family Office or an IRA.",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(settings[0])

  const handleAccountType = ({ name, description }: setting) => {
    setSelected({ name, description })
  }

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected} className="max-w-2xl mt-4">
        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
        <div className="-space-y-px rounded-md bg-white">
          {settings.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={setting.name}
              value={setting}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === settings.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked
                    ? 'z-10 border-indigo-200 bg-indigo-50'
                    : 'border-gray-200',
                  'relative flex cursor-pointer border p-4 focus:outline-none'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? 'border-transparent bg-indigo-600'
                        : 'border-gray-300 bg-white',
                      active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                      'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border'
                    )}
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <span className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? 'text-indigo-900' : 'text-gray-900',
                        'block text-sm font-medium'
                      )}
                    >
                      {setting.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? 'text-indigo-700' : 'text-gray-500',
                        'block text-sm'
                      )}
                    >
                      {setting.description}
                    </RadioGroup.Description>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {selected?.name == 'Entity' && (
        <div className=" max-w-xl relative mt-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Entity Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="ChainRaise Investments"
          />
        </div>
      )}
         <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        </div>
    </>
  )
}
