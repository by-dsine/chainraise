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
import { useInvestorForm } from '../../zustand'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { AccountTypeForm } from '../../types/typings'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

export default function AccountType() {
  const [selected, setSelected] = useState(settings[0])
  const investorForm = useInvestorForm()
  const router = useRouter()

  let schema = yup.object().shape({
    accountType: yup
      .string()
      .oneOf(['Individual', 'Entity'], "Please select an account type.")
      .required('Please select an account type.'),
    entityName: yup.string().nullable(),
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<AccountTypeForm>({
    defaultValues: {
      accountType: 'entity',
      entityName: undefined,
    },
    resolver: yupResolver(schema),
  })

  const watchType = watch("accountType")

  const onSubmit = handleSubmit((data) => {
    const isEntity = data.accountType == 'Entity'
    let hasEntityName =
      /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$|\w+/.test(
        data.entityName
      )

    const entityError = isEntity && !hasEntityName

    if (entityError) {
      setError('entityName', {type: "custom", message: "Please enter a name for your entity."})
    }

    if (!errors.accountType && !errors.entityName && !entityError) {
      investorForm.setAccountType(data.accountType)
      investorForm.setEntityName(data.entityName)
      investorForm.setStepNumber(1)
    }
    console.log("end")
    console.log(investorForm.stepNumber)
  })

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} className="mx-auto mt-4 max-w-2xl">
            <RadioGroup.Label className="sr-only">
              Account Type
            </RadioGroup.Label>
            <div className="-space-y-px rounded-md bg-white">
              {settings.map((setting, settingIdx) => (
                <RadioGroup.Option
                  {...register('accountType')}
                  key={setting.name}
                  value={setting.name}
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
                            ? 'border-transparent bg-cr-primary'
                            : 'border-gray-300 bg-white',
                          active ? 'ring-2 ring-cr-primary ring-offset-2' : '',
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
                            checked ? 'text-cr-primary' : 'text-gray-900',
                            'block text-sm font-medium'
                          )}
                        >
                          {setting.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={classNames(
                            checked ? 'text-cr-primary' : 'text-gray-500',
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
        )}
      />

      {errors?.accountType && (
        <div className='flex'>
        <p className="mt-2 mx-auto text-sm text-red-600">
          {errors.accountType.message}
        </p>
        </div>
      )}

      {watchType == 'Entity' && (
        <div className=" relative mx-auto mt-3 max-w-xl rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cr-primary focus-within:ring-1 focus-within:ring-cr-primary">
          <label
            htmlFor="entityName"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Entity Name
          </label>
          <input
            type="text"
            {...register('entityName')}
            id="entityName"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="ChainRaise Investments"
          />
        </div>
      )}
      {watchType == 'Entity' && errors?.entityName && (
        <div className='flex'>
        <p className="mt-2 mx-auto text-sm text-red-600">
          {errors.entityName.message}
        </p>
        </div>
      )}
      <div className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cr-primary focus:ring-offset-2"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cr-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cr-primary focus:outline-none focus:ring-2 focus:ring-cr-primary focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  )
}
