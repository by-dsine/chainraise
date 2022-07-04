import create from 'zustand';

interface newOfferingFormStore {
   organizationId: string;
   setOrganizationId: (newOrganizationId: string) => void;
   organizationName: string;
   setOrganizationName: (newOrganizationName: string) => void;
}

export const useNewOfferingFormStore = create<newOfferingFormStore>((set) => ({
   organizationId: 'default',
   setOrganizationId: (newOrganizationId) => {
      set(() => ({ organizationId: newOrganizationId }));
   },
   organizationName: '',
   setOrganizationName: (newOrganizationName) => {
      set((state) => ({ ...state, organizationName: newOrganizationName }));
   },
}));
