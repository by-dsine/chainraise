import create from 'zustand'

const useModalStore = create(set => ({
    modalOpen: false,
}))