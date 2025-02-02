import { useQuery } from '@tanstack/react-query'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'
import { client } from '../../http-client'

const enum Routes {
  PROFILE_INFO = '/profile',
  SEARCH_FRIENDS = '/user/friends'
}

export type ProfileInfoResponse = {
  id: number
  nickname: string
  firstName: string
  lastName: string
  email: string
}

const isProfileInfoResponse = (obj: any): obj is ProfileInfoResponse => {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    typeof obj.id === 'number' &&
    typeof obj.nickname === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.email === 'string'
  )
}

const fetchProfileInfo = async () => {
  try {
    const { data: responseData } = await client.get(Routes.PROFILE_INFO)
    if (isProfileInfoResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useProfileInfoAPI = () => {
  return useQuery<ProfileInfoResponse, ErrorAPI>({
    queryKey: ['profileInfo'],
    queryFn: fetchProfileInfo,
  })
}

