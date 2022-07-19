import create from 'zustand';

interface PaymentSubmittedModalStore {
   modalOpen: boolean;
   setModalOpen: (isOpen: boolean) => void;
}

export const usePaymentSubmittedModalStore = create<PaymentSubmittedModalStore>(
   (set) => ({
      modalOpen: false,
      setModalOpen: (isOpen) => {
         set((state) => ({
            ...state,
            modalOpen: isOpen,
         }));
      },
   })
);
