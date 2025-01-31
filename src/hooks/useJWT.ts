import { registerJWT, unregisterJWT } from '../http-client'
import { create } from 'zustand'

const JWT_LOCALSTORAGE_KEY = 'tracery_jwt_token'

type TokenStorage = {
  token: string | null
  setToken: (newToken: string | null) => void
}

export const useJWT = create<TokenStorage>(set => ({
  token: window.localStorage.getItem(JWT_LOCALSTORAGE_KEY),
  setToken: newToken => {
    if (newToken === null) {
      window.localStorage.removeItem(JWT_LOCALSTORAGE_KEY)
      unregisterJWT()
    } else {
      window.localStorage.setItem(JWT_LOCALSTORAGE_KEY, newToken)
      registerJWT(newToken)
    }
    set(prev => ({
      ...prev,
      token: newToken,
    }))
  },
}))
