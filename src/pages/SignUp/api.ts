import { useMutation } from '@tanstack/react-query'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'
import { client } from '../../http-client'

const API_SIGNUP_ROUTE = '/auth/sign-up'

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
        const { data: responseData } = await client.post(API_SIGNUP_ROUTE, data)
        if (isSignUpResponse(responseData)) {
          return responseData
        }
        throw intoErrorAPI(responseData)
      } catch (error: any) {
        throw propagateErrorAPI(error)
      }
    },
  })
}
