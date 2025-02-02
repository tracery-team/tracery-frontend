import { useQuery } from '@tanstack/react-query'
import { client } from '../../http-client'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'

const USER_INFO_ROUTE = '/user/info'

export type UserInfoResponse = {
  id: number
  nickname: string
  firstName: string
  lastName: string
  email: string
  friends: Omit<UserInfoResponse, 'friends'>[]
}

const isUserInfoResponse = (obj: any): obj is UserInfoResponse => {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    typeof obj.id === 'number' &&
    typeof obj.nickname === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.email === 'string' &&
    obj.friends instanceof Array
  )
}

const fetchProfileInfo = async (id: number) => {
  const route = `${USER_INFO_ROUTE}/${id}`
  try {
    const { data: responseData } = await client.get(route)
    if (isUserInfoResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useUserInfoAPI = (id: string | undefined) => {
  return useQuery<UserInfoResponse, ErrorAPI>({
    queryKey: ['userInfo', id],
    queryFn: () => fetchProfileInfo(Number(id)),
    enabled: id !== undefined,
  })
}
