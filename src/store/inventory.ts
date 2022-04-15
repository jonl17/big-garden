import create from 'zustand'

interface InventoryState {
  inventoryOpen: boolean
  inventory: string[]
  toggleInventory: (open: boolean) => void
  addToInventory: (item: string) => void
  findItem: (id: string) => string | undefined
}

export const useInventory = create<InventoryState>(
  (set, get) => ({
    inventoryOpen: false,
    inventory: [],
    toggleInventory: (inventoryOpen) =>
      set(() => ({
        inventoryOpen,
      })),
    addToInventory: (item) =>
      set((store) => ({
        inventory: store.inventory.includes(item)
          ? store.inventory
          : [...store.inventory, item],
      })),
    findItem: (id) =>
      get().inventory.find((item) => item === id),
  })
)
