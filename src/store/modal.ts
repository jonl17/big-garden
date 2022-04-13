import { ISculpture } from '@types'
import create from 'zustand'

interface IModalStore {
  isOpen: boolean
  closeModal: () => void
  openModal: (sculpture: ISculpture) => void
  sculpture?: ISculpture
}

export const useModal = create<IModalStore>((set) => ({
  isOpen: false,
  closeModal: () =>
    set({
      isOpen: false,
      sculpture: undefined,
    }),
  openModal: (sculpture: ISculpture) =>
    set({
      isOpen: true,
      sculpture,
    }),
}))
