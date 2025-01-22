import { create } from 'zustand'

export type LoginState = {
  login: string
  password: string
  setLogin: (newLogin: string) => void
  setPassword: (newPassword: string) => void
}

const useLoginState = create<LoginState>(set => ({
  login: '',
  password: '',

  setLogin: (newLogin: string) =>
    set(state => ({
      ...state,
      login: newLogin,
    })),

  setPassword: newPassword =>
    set(state => ({
      ...state,
      password: newPassword,
    })),
}))

export default useLoginState
