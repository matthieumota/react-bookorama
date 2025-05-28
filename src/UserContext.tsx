import axios from 'axios'
import { createContext, useState } from 'react'

export type User = {
    name: string
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
    login: (user: User) => void
    logout: () => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    login: () => {},
    logout: () => {},
})

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>({ name: 'Fiorella' })

  const login = async (user: User) => {
    const response = await axios.get('https://httpbin.org/get')

    if (response.status === 200) {
        setUser(user)
    }
  }

  const logout = async () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
