/* eslint-disable camelcase */
'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type User = {
  token: string
  expiry_timestamp: number
  user_id: string
  user_name: string
  user_email: string
}

type SignInCredentials = {
  password: string
  email: string
}

type AuthContexData = {
  signIn: (credentials: SignInCredentials) => Promise<boolean>
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
  setUser: Dispatch<SetStateAction<User | undefined>>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContexData)

let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User>()

  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          router.push('/')
          break
        default:
          break
      }
    }
  }, [router, isAuthenticated])

  useEffect(() => {
    const { 'curriculum42.data': data } = parseCookies()

    if (data) {
      const { user_id, user_email, expiry_timestamp, user_name, token } =
        JSON.parse(data)
      setUser({ user_id, user_email, expiry_timestamp, user_name, token })
    } else {
      signOut()
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/account/login', {
        email,
        password,
      })

      const {
        user_id,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user_email,
        expiry_timestamp,
        user_name,
        token,
      } = response.data.payload

      setCookie(
        undefined,
        'curriculum42.data',
        JSON.stringify(response.data.payload),
        {
          maxAge: new Date(expiry_timestamp), // 1 dia
          path: '/',
        },
      )

      setCookie(undefined, 'curriculum42.token', token, {
        maxAge: new Date(expiry_timestamp), // 1 dia
        path: '/',
      })

      setUser({
        user_id,
        user_email,
        expiry_timestamp,
        user_name,
        token,
      })

      // api.defaults.headers.Authorization = `Bearer ${token}`

      router.push('/dashboard')
      return true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(`${err.response.data.message}`)
      console.log(err)
      return false
    }
  }

  function signOut() {
    destroyCookie(undefined, 'curriculum42.token')
    destroyCookie(undefined, 'curriculum42.data')
    toast.success('Você saiu da sua conta!')

    authChannel.postMessage('signOut')
    setUser(undefined)

    router.push('/')
  }
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
