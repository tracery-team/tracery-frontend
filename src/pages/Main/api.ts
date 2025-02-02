import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'
import { client } from '../../http-client'

const enum Routes {
  PROFILE_INFO = '/profile',
  SEARCH_FRIENDS = '/user/friends',
  ADD_FRIEND = '/user/add-friend',
  REMOVE_FRIEND = '/user/remove-friend',
}

// fetching profile info

export type ProfileInfoResponse = {
  id: number
  nickname: string
  firstName: string
  lastName: string
  email: string
  friends: Omit<ProfileInfoResponse, 'friends'>[]
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
    typeof obj.email === 'string' &&
    obj.friends instanceof Array
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

// searching for friends

export type FriendSearchResponse = ProfileInfoResponse[]

const fetchPotentialFriendsList = async (page: number, search: string) => {
  try {
    const { data: responseData } = await client.get(
      `${Routes.SEARCH_FRIENDS}`,
      {
        params: { page, search },
      },
    )
    if (responseData instanceof Array) {
      return responseData as FriendSearchResponse
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const usePotentialFriendSearchAPI = (page: number, search: string) => {
  return useQuery<FriendSearchResponse, ErrorAPI>({
    queryKey: ['potentialFriends', page, search],
    queryFn: () => fetchPotentialFriendsList(page, search),
  })
}

// adding / removing friends

type ModifyFriendsResponse = {
  message: string
}

const isModifyFriendsResponse = (obj: any): obj is ModifyFriendsResponse => {
  return obj !== null && obj !== undefined && typeof obj.message === 'string'
}

const addFriend = async (friendId: number) => {
  try {
    const { data: responseData } = await client.post(Routes.ADD_FRIEND, {
      friendId,
    })
    if (isModifyFriendsResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useAddFriendAPI = () => {
  const queryClient = useQueryClient()

  return useMutation<ModifyFriendsResponse, ErrorAPI, number>({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileInfo'],
      })
    },
  })
}

const removeFriend = async (friendId: number) => {
  try {
    const { data: responseData } = await client.delete(Routes.REMOVE_FRIEND, {
      data: { friendId },
    })
    if (isModifyFriendsResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useRemoveFriendAPI = () => {
  const queryClient = useQueryClient()

  return useMutation<ModifyFriendsResponse, ErrorAPI, number>({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileInfo'],
      })
    },
  })
}
