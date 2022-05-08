import create from 'zustand'

interface InventoryState {
  inventoryOpen: boolean
  inventory: string[]
  toggleInventory: (open: boolean) => void
  addToInventory: (item: string) => void
  findItem: (id: string) => string | undefined
}

const TEST_INVENTORY = [
  '7469537b-e008-4c0a-a98b-b158e150b588',
  '7f8f6e2e-bf11-498b-8a1f-761ef2522a85',
]

export const useInventory = create<InventoryState>(
  (set, get) => ({
    inventoryOpen: false,
    inventory: TEST_INVENTORY,
    toggleInventory: (inventoryOpen) =>
      set(() => ({
        inventoryOpen,
      })),
    addToInventory: (item) =>
      set((store) => ({
        inventory: [...store.inventory, item],
      })),
    findItem: (id) =>
      get().inventory.find((item) => item === id),
  })
)
