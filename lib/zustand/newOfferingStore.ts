import create from 'zustand'

interface newOfferingFormStore {
    organizationId: string
    setOrganizationId: (newOrganizationId: string) => void 
}

export const useNewOfferingFormStore = create<newOfferingFormStore>((set) => ({
    organizationId: '',
    setOrganizationId: (newOrganizationId) => {
        set((state) => ({
            ...state,
            organizationId: newOrganizationId
        }))
    },
}))