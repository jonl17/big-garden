import { ISculpture } from '@types'
import create from 'zustand'

interface ISculptureStore {
  sculptures: ISculpture[]
  updateSculptures: (sculptures: ISculpture[]) => void
}

export const useSculptures = create<ISculptureStore>(
  (set) => ({
    sculptures: [],
    updateSculptures: (sculptures) =>
      set(() => ({
        sculptures,
      })),
  })
)
