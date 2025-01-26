import { create } from 'zustand'

export type SignupState = {
  nickname: string
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string

  setNickname: (newNickname: string) => void
  setFirstName: (newFirstName: string) => void
  setLastName: (newLastName: string) => void
  setEmail: (newEmail: string) => void
  setPassword: (newPassword: string) => void
  setRepeatPassword: (newRepeatPassword: string) => void
}

const useSignupState = create<SignupState>(set => ({
  nickname: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',

  setNickname: (value: string) =>
    set(state => ({
      ...state,
      nickname: value,
    })),

  setFirstName: (value: string) =>
    set(state => ({
      ...state,
      firstName: value,
    })),

  setLastName: (value: string) =>
    set(state => ({
      ...state,
      lastName: value,
    })),

  setEmail: (value: string) =>
    set(state => ({
      ...state,
      email: value,
    })),

  setPassword: (value: string) =>
    set(state => ({
      ...state,
      password: value,
    })),

  setRepeatPassword: (value: string) =>
    set(state => ({
      ...state,
      repeatPassword: value,
    })),
}))

export default useSignupState
