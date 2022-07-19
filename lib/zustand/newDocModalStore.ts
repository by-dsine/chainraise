import create from 'zustand';

interface NewDocModalStore {
   modalOpen: boolean;
   setModalOpen: (isOpen: boolean) => void;
   docSigned: boolean;
   setDocSigned: (docSigned: boolean) => void;
}

export const useNewDocModalStore = create<NewDocModalStore>((set) => ({
   modalOpen: false,
   setModalOpen: (isOpen) => {
      set((state) => ({
         ...state,
         modalOpen: isOpen,
      }));
   },
   docSigned: false,
   setDocSigned: (isSigned) => {
      set((state) => ({
         ...state,
         docSigned: isSigned,
      }));
   },
}));
