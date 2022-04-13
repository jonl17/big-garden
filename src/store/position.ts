import create from 'zustand'

interface IPositionStore {
  coordinates?: GeolocationCoordinates
  updateCoordinates: (
    coordinates: GeolocationCoordinates
  ) => void
}

export const usePosition = create<IPositionStore>(
  (set) => ({
    updateCoordinates: (
      coordinates: GeolocationCoordinates
    ) =>
      set({
        coordinates,
      }),
  })
)
