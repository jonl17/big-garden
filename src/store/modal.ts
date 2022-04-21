import { ISculpture } from '@types'
import create from 'zustand'

interface IModalStore {
  isOpen: boolean
  closeModal: () => void
  openModal: (id: string) => void
  sculptureId?: string
}

export const useModal = create<IModalStore>((set) => ({
  isOpen: false,
  closeModal: () =>
    set({
      isOpen: false,
      sculptureId: undefined,
    }),
  openModal: (sculptureId) =>
    set({
      isOpen: true,
      sculptureId,
    }),
}))
