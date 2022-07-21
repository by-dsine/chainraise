import create from 'zustand';

interface NewAccountModalStore {
   modalOpen: boolean;
   setModalOpen: (isOpen: boolean) => void;
   email: string;
   setEmail: (newEmail: string) => void;
}

export const useNewAccountModalStore = create<NewAccountModalStore>((set) => ({
   modalOpen: false,
   setModalOpen: (isOpen) => {
      set((state) => ({
         ...state,
         modalOpen: isOpen,
      }));
   },
   email: '',
   setEmail: (newEmail) => {
      set((state) => ({
         ...state,
         email: newEmail,
      }));
   },
}));
