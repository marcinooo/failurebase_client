import React from 'react'
import { createContext, useContext, useState, type ReactElement, type ReactNode, type Dispatch, type SetStateAction } from 'react'

interface MainContextType {
  loading: boolean
  selectedEvents: string[]
  selectedTests: string[]
  setLoading: Dispatch<SetStateAction<boolean>>
  setSelectedEvents: Dispatch<SetStateAction<string[]>>
  setSelectedTests: Dispatch<SetStateAction<string[]>>
}

const MainContext = createContext<MainContextType>({
  loading: false,
  selectedEvents: [],
  selectedTests: [],
  setLoading: () => {},
  setSelectedEvents: () => {},
  setSelectedTests: () => {}
})

interface ChlderenElement {
  children: ReactNode | ReactElement
}

export const ContextProvider: React.FC<ChlderenElement> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const value = { loading, setLoading, selectedEvents, setSelectedEvents, selectedTests, setSelectedTests }
  return (
    <MainContext.Provider value={value}>{children}</MainContext.Provider>
  )
}

export const useMainContext = (): MainContextType => {
  const context = useContext(MainContext)
  if (context === null) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}
