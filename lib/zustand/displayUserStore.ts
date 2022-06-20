import { DisplayUser } from "../../types/typings";
import create from 'zustand'

interface displayUserStore {
    displayUsers: DisplayUser[]
    addDisplayUser: (displayUser: DisplayUser) => void
}

export const useDisplayUserStore = create<displayUserStore>((set) => ({
    displayUsers: [],
    addDisplayUser: (displayUser) => {
      set((state) => ({
        ...state,
        displayUsers: [
            ...state.displayUsers, displayUser
        ]
      }))
    },
  }))