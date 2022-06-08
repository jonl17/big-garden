import create from 'zustand'

interface IMapStore {
  map: any
  setMap: (map: any) => void
}

export const useRefMap = create<IMapStore>((set) => ({
  map: null,
  setMap: (map: any) =>
    set(() => ({
      map,
    })),
}))
