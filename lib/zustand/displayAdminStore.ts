import { DisplayAdminOffering, DisplayAdminUser } from '../../types/typings'
import create from 'zustand'

interface DisplayAdminStore {
  displayUsers: DisplayAdminUser[]
  addDisplayUser: (displayUser: DisplayAdminUser) => void
  displayOfferings: DisplayAdminOffering[]
  addDisplayOffering: (displayOffering: DisplayAdminOffering) => void
}

export const useDisplayStore = create<DisplayAdminStore>((set) => ({
  displayUsers: [],
  addDisplayUser: (displayUser) => {
    set((state) => ({
      ...state,
      displayUsers: [...state.displayUsers, displayUser],
    }))
  },
  displayOfferings: [],
  addDisplayOffering: (displayOffering) => {
    set((state) => ({
      ...state,
      displayOfferings: [...state.displayOfferings, displayOffering],
    }))
  },
}))
