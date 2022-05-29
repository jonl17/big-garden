import create from 'zustand'

interface IGameStore {
  started: boolean
  setStarted: () => void
}

export const useGame = create<IGameStore>((set) => ({
  started: false,
  setStarted: () =>
    set(() => ({
      started: true,
    })),
}))
