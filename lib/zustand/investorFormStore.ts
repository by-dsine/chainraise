import create from 'zustand';

interface investorFormStore {
   // step 0
   stepNumber: number;
   setStepNumber: (stepNumber: number) => void;

   offeringSlug: string;
   setOfferingSlug: (offeringSlug: string) => void;

   investmentAmount: number;
   setInvestmentAmount: (investmentAmount: number) => void;

   // step 1
   accountType: string; // can only be entity or individual
   setAccountType: (accountType: string) => void;

   entityName: string; // optional
   setEntityName: (entityName: string) => void;

   // step 2
   firstName: string;
   setFirstName: (firstName: string) => void;

   middleName: string;
   setMiddleName: (middleName: string) => void;

   lastName: string;
   setLastName: (lastName: string) => void;

   title: string;
   setTitle: (title: string) => void;

   email: string;
   setEmail: (email: string) => void;

   phone: string;
   setPhone: (phone: string) => void;

   dateOfBirth: string;
   setDateOfBirth: (dateOfBirth: string) => void;

   address1: string;
   setAddress1: (address1: string) => void;

   address2: string;
   setAddress2: (address2: string) => void;

   unit: string;
   setUnit: (unit: string) => void;

   city: string;
   setCity: (city: string) => void;

   state: string;
   setState: (state: string) => void;

   zipCode: string;
   setZipCode: (zipCode: string) => void;

   residence: string;
   setResidence: (residence: string) => void;

   countryOfResidence: string;
   setCountryOfResidence: (countryOfResidence: string) => void;

   // step 3
   kycStatus: string;
   setKycStatus: (kycStatus: string) => void;

   amlStatus: string;
   setAmlStatus: (amlStatus: string) => void;
}

export const useInvestorForm = create<investorFormStore>((set) => ({
   stepNumber: 0,
   setStepNumber: (value) => {
      set((state) => ({
         ...state,
         stepNumber: value,
      }));
   },
   offeringSlug: '',
   setOfferingSlug: (value) => {
      set((state) => ({
         ...state,
         oid: value,
      }));
   },
   investmentAmount: 0,
   setInvestmentAmount: (value) => {
      set((state) => ({
         ...state,
         investmentAmount: value,
      }));
   },
   accountType: '',
   setAccountType: (value) => {
      set((state) => ({
         ...state,
         accountType: value,
      }));
   },
   entityName: '',
   setEntityName: (value) => {
      set((state) => ({
         ...state,
         entityName: value,
      }));
   },
   firstName: '',
   setFirstName: (value) => {
      set((state) => ({
         ...state,
         firstName: value,
      }));
   },
   middleName: '',
   setMiddleName: (value) => {
      set((state) => ({
         ...state,
         middleName: value,
      }));
   },
   lastName: '',
   setLastName: (value) => {
      set((state) => ({
         ...state,
         lastName: value,
      }));
   },
   title: '',
   setTitle: (value) => {
      set((state) => ({
         ...state,
         title: value,
      }));
   },
   email: '',
   setEmail: (value) => {
      set((state) => ({
         ...state,
         email: value,
      }));
   },
   phone: '',
   setPhone: (value) => {
      set((state) => ({
         ...state,
         phone: value,
      }));
   },
   dateOfBirth: '',
   setDateOfBirth: (value) => {
      set((state) => ({
         ...state,
         dateOfBirth: value,
      }));
   },
   address1: '',
   setAddress1: (value) => {
      set((state) => ({
         ...state,
         address1: value,
      }));
   },
   address2: '',
   setAddress2: (value) => {
      set((state) => ({
         ...state,
         address1: value,
      }));
   },
   unit: '',
   setUnit: (value) => {
      set((state) => ({
         ...state,
         unit: value,
      }));
   },
   city: '',
   setCity: (value) => {
      set((state) => ({
         ...state,
         city: value,
      }));
   },
   state: '',
   setState: (value) => {
      set((state) => ({
         ...state,
         state: value,
      }));
   },
   zipCode: '',
   setZipCode: (value) => {
      set((state) => ({
         ...state,
         zipCode: value,
      }));
   },
   residence: '',
   setResidence: (value) => {
      set((state) => ({
         ...state,
         residence: value,
      }));
   },
   countryOfResidence: '',
   setCountryOfResidence: (value) => {
      set((state) => ({
         ...state,
         countryOfResidence: value,
      }));
   },
   kycStatus: '',
   setKycStatus: (value) => {
      set((state) => ({
         ...state,
         kycStatus: value,
      }));
   },
   amlStatus: '',
   setAmlStatus: (value) => {
      set((state) => ({
         ...state,
         amlStatus: value,
      }));
   },
}));

// modal state
interface modal {
   isOpen: boolean;
   setIsOpen: (isOpen: boolean) => void;
}

export const useKycModal = create<modal>((set) => ({
   isOpen: false,
   setIsOpen: (value) => {
      set((state) => ({
         ...state,
         isOpen: value,
      }));
   },
}));
