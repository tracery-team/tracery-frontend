import { useMutation } from '@tanstack/react-query'
import { ErrorAPI, intoErrorAPI, unknownErrorAPI } from '../../lib'

const API_SIGNUP_ROUTE = '/api/auth/sign-up'

export type SignUpData = {
  nickname: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignUpResponse = {
  message: string
}

const isSignUpResponse = (obj: any): obj is SignUpResponse => {
  return (
    obj !== null &&
    obj !== undefined &&
    'message' in obj &&
    typeof obj.message === 'string'
  )
}

export const useSignUpAPI = () => {
  return useMutation<SignUpResponse, ErrorAPI, SignUpData>({
    mutationFn: async data => {
      try {
        const response = await fetch(API_SIGNUP_ROUTE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const responseData = await response.json()
        if (response.ok && isSignUpResponse(responseData)) {
          return responseData
        }
        throw intoErrorAPI(responseData)
      } catch (error) {
        throw intoErrorAPI(error)
      }
    },
  })
}
