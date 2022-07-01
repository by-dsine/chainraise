import { ProfileDocument } from '@prisma/client'
import create from 'zustand'

export interface ProfileInfoStore {
  firstName: string
  setFirstName: (firstName: string) => void

  middleName: string
  setMiddleName: (middleName: string) => void

  lastName: string
  setLastName: (lastName: string) => void

  email: string
  setEmail: (email: string) => void

  phone: string
  setPhone: (phone: string) => void

  address1: string
  setAddress1: (address1: string) => void

  address2: string
  setAddress2: (address2: string) => void

  unit: string
  setUnit: (unit: string) => void

  city: string
  setCity: (city: string) => void

  state: string
  setState: (state: string) => void

  zipCode: string
  setZipCode: (zipCode: string) => void

  dateOfBirth: string
  setDateOfBirth: (state: string) => void

  ssn: string
  setSSN: (zipCode: string) => void

  kycStatus: string
  setKycStatus: (kycStatus: string) => void

  amlStatus: string
  setAmlStatus: (amlStatus: string) => void

  docs: ProfileDocument[]
  addProfileDoc: (document: ProfileDocument) => void
  removeProfileDoc: (documentIndex: number) => void
  updateProfileDoc: (document: ProfileDocument) => void
}

export const useProfileInfoStore = create<ProfileInfoStore>((set) => ({
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
  email: '',
  setEmail: (value) => {
    set((state) => ({
      ...state,
      email: value,
    }))
  },
  phone: '',
  setPhone: (value) => {
    set((state) => ({
      ...state,
      phone: value,
    }))
  },
  address1: '',
  setAddress1: (value) => {
    set((state) => ({
      ...state,
      address1: value,
    }))
  },
  address2: '',
  setAddress2: (value) => {
    set((state) => ({
      ...state,
      address1: value,
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
  zipCode: '',
  setZipCode: (value) => {
    set((state) => ({
      ...state,
      zipCode: value,
    }))
  },
  dateOfBirth: '',
  setDateOfBirth: (value) => {
    set((state) => ({
      ...state,
      dateOfBirth: value,
    }))
  },
  ssn: '',
  setSSN: (value) => {
    set((state) => ({
      ...state,
      ssn: value,
    }))
  },
  kycStatus: '',
  setKycStatus: (value) => {
    set((state) => ({
      ...state,
      kycStatus: value,
    }))
  },
  amlStatus: '',
  setAmlStatus: (value) => {
    set((state) => ({
      ...state,
      amlStatus: value,
    }))
  },
  docs: [],
  addProfileDoc: (doc) => {
    set((state) => ({
      ...state,
      docs: [...state.docs, doc],
    }))
  },
  removeProfileDoc: (documentId) => {
    set((state) => ({
      ...state,
      docs: state.docs.filter((_item, index) => documentId !== index),
    }))
  },
  updateProfileDoc: (doc) => {
    set((state) => ({
      ...state,
      docs: state.docs.filter((item) => item.id !== doc.id),
    }))
  },
}))
