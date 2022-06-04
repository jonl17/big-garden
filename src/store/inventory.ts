import create from 'zustand'

interface InventoryState {
  inventoryOpen: boolean
  inventory: string[]
  toggleInventory: (open: boolean) => void
  addToInventory: (item: string) => void
  findItem: (id: string) => string | undefined
  initInventory: (items: string[]) => void
}

const TEST_INVENTORY = [
  '7469537b-e008-4c0a-a98b-b158e150b588',
  '7f8f6e2e-bf11-498b-8a1f-761ef2522a85',
  'bca5c478-497f-4c2e-9987-560b621ce511',
]

const KEY = 'Sculpture Hunt inventory key'

export const saveToLocalStorage = (id: string) => {
  const currentInventory = loadFromLocalStorage()
  const updatedInventory = currentInventory.includes(id)
    ? currentInventory
    : [...currentInventory, id]
  localStorage.setItem(
    KEY,
    JSON.stringify(updatedInventory)
  )
}
export const loadFromLocalStorage = (): string[] => {
  const inventory = localStorage.getItem(KEY)
  if (inventory) {
    return JSON.parse(inventory)
  }
  return []
}

export const useInventory = create<InventoryState>(
  (set, get) => ({
    inventoryOpen: false,
    inventory: [],
    toggleInventory: (inventoryOpen) =>
      set(() => ({
        inventoryOpen,
      })),
    addToInventory: (item) => {
      return set((store) => ({
        inventory: [...store.inventory, item],
      }))
    },
    findItem: (id) =>
      get().inventory.find((item) => item === id),
    initInventory: (inventory) =>
      set(() => ({ inventory })),
  })
)
