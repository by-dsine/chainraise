import create from 'zustand'

const useModalStore = create(set => ({
    modalOpen: false,
}))



// Zustand implementation
type investorFlowStore = {
    // input fields
    // step 0
    stepNumber: number;
    oid: string;
    dollarAmount: number;
    centAmount: number;

    // step 1
    accountType: string; // can only be entity or individual
    entityName: string; // optional

    // field CRUDs

}