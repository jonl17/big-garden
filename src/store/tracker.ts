import { ISculpture } from '@types'
import create from 'zustand'

type TrackType = {
  name: string
  distance: number
  isInProximity: boolean
  collected: boolean
} & ISculpture

interface TrackerStore {
  tracked: TrackType[]
  updateTracking: (tracks: TrackType[]) => void
}

export const useTracker = create<TrackerStore>((set) => ({
  tracked: [],
  updateTracking: (tracked: TrackType[]) =>
    set(() => ({
      tracked,
    })),
}))
