import { StatementType } from '@fauna-labs/fauna-schema-migrate/dist/types/expressions'
import create from 'zustand'

interface investorFormStore {
  // step 0
  stepNumber: number
  setStepNumber: (stepNumber: number) => void

  oid: string
  setOid: (oid: string) => void

  dollarAmount: number
  setDollarAmount: (dollarAmount: number) => void

  centAmount: number
  setCentAmount: (centAmount: number) => void

  // step 1
  accountType: string // can only be entity or individual
  setAccountType: (accountType: string) => void

  entityName: string // optional
  setEntityName: (entityName: string) => void

  // step 2
  firstName: string
  setFirstName: (firstName: string) => void

  middleName: string
  setMiddleName: (middleName: string) => void

  lastName: string
  setLastName: (lastName: string) => void

  title: string
  setTitle: (title: string) => void

  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void

  dateOfBirth: string
  setDateOfBirth: (dateOfBirth: string) => void

  streetAddress: string
  setStreetAddress: (streetAddress: string) => void

  unit: string
  setUnit: (unit: string) => void

  city: string
  setCity: (city: string) => void

  state: string
  setState: (state: string) => void

  postalCode: string
  setPostalCode: (postalCode: string) => void

  nationality: string
  setNationality: (nationality: string) => void

  countryOfResidence: string
  setCountryOfResidence: (countryOfResidence: string) => void
}

export const useInvestorForm = create<investorFormStore>((set) => ({
  stepNumber: 0,
  setStepNumber: (value) => {
    set((state) => ({
      ...state,
      stepNumber: value,
    }))
  },
  oid: '',
  setOid: (value) => {
    set((state) => ({
      ...state,
      oid: value,
    }))
  },
  dollarAmount: 0,
  setDollarAmount: (value) => {
    set((state) => ({
      ...state,
      dollarAmount: value,
    }))
  },
  centAmount: 0,
  setCentAmount: (value) => {
    set((state) => ({
      ...state,
      centAmount: value,
    }))
  },
  accountType: '',
  setAccountType: (value) => {
    set((state) => ({
      ...state,
      accountType: value,
    }))
  },
  entityName: '',
  setEntityName: (value) => {
    set((state) => ({
      ...state,
      entityName: value,
    }))
  },
  firstName: '',
  setFirstName: (value) => {
    set((state) => ({
      ...state,
      firstName: value,
    }))
  },
  middleName: '',
  setMiddleName: (value) => {
    set((state) => ({
      ...state,
      middleName: value,
    }))
  },
  lastName: '',
  setLastName: (value) => {
    set((state) => ({
      ...state,
      lastName: value,
    }))
  },
  title: '',
  setTitle: (value) => {
    set((state) => ({
      ...state,
      title: value,
    }))
  },
  phoneNumber: '',
  setPhoneNumber: (value) => {
    set((state) => ({
      ...state,
      phoneNumber: value,
    }))
  },
  dateOfBirth: '',
  setDateOfBirth: (value) => {
    set((state) => ({
      ...state,
      dateOfBirth: value,
    }))
  },
  streetAddress: '',
  setStreetAddress: (value) => {
    set((state) => ({
      ...state,
      streetAddress: value,
    }))
  },
  unit: '',
  setUnit: (value) => {
    set((state) => ({
      ...state,
      unit: value,
    }))
  },
  city: '',
  setCity: (value) => {
    set((state) => ({
      ...state,
      city: value,
    }))
  },
  state: '',
  setState: (value) => {
    set((state) => ({
      ...state,
      state: value,
    }))
  },
  postalCode: '',
  setPostalCode: (value) => {
    set((state) => ({
      ...state,
      postalCode: value,
    }))
  },
  nationality: '',
  setNationality: (value) => {
    set((state) => ({
      ...state,
      nationality: value,
    }))
  },
  countryOfResidence: '',
  setCountryOfResidence: (value) => {
    set((state) => ({
      ...state,
      countryOfResidence: value,
    }))
  },
}))
