import create from 'zustand'

type TrackType = {
  id: string
  name: string
  distance: number
  isInProximity: boolean
  collected: boolean
}

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
