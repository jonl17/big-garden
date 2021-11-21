import { useContext, createContext, useState } from 'react'

type PositionType = { lat: number; lng: number }

const LocationContext = createContext<{
  position?: PositionType
  updatePosition: (pos: PositionType) => void
}>({ position: undefined, updatePosition() {} })

const LocationProvider: React.FC = ({ children }) => {
  const [position, setPosition] = useState<PositionType>()

  const updatePosition = (pos: PositionType) =>
    setPosition(pos)

  return (
    <LocationContext.Provider
      value={{ position, updatePosition }}
    >
      {children}
    </LocationContext.Provider>
  )
}

const useLocationContext = () => useContext(LocationContext)

export { LocationProvider, useLocationContext }
