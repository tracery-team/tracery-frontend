import { useMutation } from '@tanstack/react-query'
import { useJWT } from '../../hooks/useJWT'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'
import { useCallback } from 'react'
import { client } from '../../http-client'

const API_LOGIN_ROUTE = '/auth/login'

export type LoginData = {
  login: string
  password: string
}

export type LoginResponse = {
  access_token: string
}

const isLoginResponse = (obj: any): obj is LoginResponse => {
  return (
    obj !== null &&
    obj !== undefined &&
    'access_token' in obj &&
    typeof obj.access_token === 'string'
  )
}

export const useLoginAPI = () => {
  const { setToken } = useJWT()

  const mutationFn = useCallback(
    async (data: LoginData) => {
      try {
        const { data: responseData } = await client.post(API_LOGIN_ROUTE, data)
        if (isLoginResponse(responseData)) {
          setToken(responseData.access_token)
          return responseData
        }
        throw intoErrorAPI(responseData)
      } catch (error: any) {
        throw propagateErrorAPI(error)
      }
    },
    [setToken],
  )

  return useMutation<LoginResponse, ErrorAPI, LoginData>({
    mutationFn,
  })
}
