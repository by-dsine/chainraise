import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useProfileInfoStore } from '../../../lib/zustand/profileStore';

type setting = {
   name: string;
   description: string;
};

const accountTypes = [
   {
      name: 'individual',
      displayName: 'Individual',
      description: 'You represent yourself. Good for you. Carpe those diems.',
   },
   {
      name: 'organization',
      displayName: 'Organization',
      description:
         "You're representing an entity or organization such as a company, family office or an IRA.",
   },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function AccountType() {
   const [selectedAccountType, setSelectedAccountType] = useState(
      accountTypes[0].displayName
   );

   const accountType = useProfileInfoStore((store) => store.accountType);
   const setAccountType = useProfileInfoStore((store) => store.setAccountType);

   const handleAccountTypeChange = (value: string) => {
      setAccountType(value);
      console.log(value);
   };

   return (
      <form>
         <RadioGroup
            value={accountType}
            onChange={(value) => handleAccountTypeChange(value)}
            className="mx-auto mt-4 max-w-2xl"
         >
            <RadioGroup.Label className="sr-only">
               Account Type
            </RadioGroup.Label>
            <div className="-space-y-px rounded-md bg-white">
               {accountTypes.map((accountType, accountTypeIdx) => (
                  <RadioGroup.Option
                     key={accountType.name}
                     value={accountType.name}
                     className={({ checked }) =>
                        classNames(
                           accountTypeIdx === 0
                              ? 'rounded-tl-md rounded-tr-md'
                              : '',
                           accountTypeIdx === accountTypes.length - 1
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
                                 active
                                    ? 'ring-2 ring-cr-primary ring-offset-2'
                                    : '',
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
                                    checked
                                       ? 'text-cr-primary'
                                       : 'text-gray-900',
                                    'block text-sm font-medium'
                                 )}
                              >
                                 {accountType.displayName}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                 as="span"
                                 className={classNames(
                                    checked
                                       ? 'text-cr-primary'
                                       : 'text-gray-500',
                                    'block text-sm'
                                 )}
                              >
                                 {accountType.description}
                              </RadioGroup.Description>
                           </span>
                        </>
                     )}
                  </RadioGroup.Option>
               ))}
            </div>
         </RadioGroup>

         <div className="pt-5">
            <div className="flex justify-end">
               <button
                  disabled
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cr-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cr-primary focus:outline-none focus:ring-2 focus:ring-cr-primary focus:ring-offset-2 disabled:opacity-75"
               >
                  Save
               </button>
            </div>
         </div>
      </form>
   );
}
