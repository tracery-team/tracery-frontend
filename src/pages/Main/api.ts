import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ErrorAPI, intoErrorAPI, propagateErrorAPI } from '../../lib'
import { client } from '../../http-client'

const enum Routes {
  PROFILE_INFO = '/profile',
  SEARCH_FRIENDS = '/user/friends',
  ADD_FRIEND = '/user/add-friend',
  REMOVE_FRIEND = '/user/remove-friend',
  SEARCH_EVENTS = '/event',
  ADD_EVENT = '/event/add',
  REMOVE_EVENT = '/event/remove',
}

// fetching profile info

export type ProfileInfoResponse = {
  id: number
  nickname: string
  firstName: string
  lastName: string
  email: string
  friends: Omit<ProfileInfoResponse, 'friends'>[]
  events: EventResponse[]
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
    obj.friends instanceof Array &&
    obj.events instanceof Array
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
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
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
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      })
    },
  })
}

// searching for friends

export type EventResponse = {
  id: number
  title: string
  description: string
  location: string
  date: string
  users: ProfileInfoResponse[]
}

export type EventSearchResponse = EventResponse[]

const fetchEventsList = async (page: number, search: string) => {
  try {
    const { data: responseData } = await client.get(`${Routes.SEARCH_EVENTS}`, {
      params: { page, search },
    })
    if (responseData instanceof Array) {
      return responseData as EventSearchResponse
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useSearchEventsAPI = (page: number, search: string) => {
  return useQuery<EventSearchResponse, ErrorAPI>({
    queryKey: ['eventsSearch', page, search],
    queryFn: () => fetchEventsList(page, search),
  })
}

// Add / Remove an event

type ModifyEventsResponse = {
  message: string
}

const isModifyEventsResponse = (obj: any): obj is ModifyEventsResponse => {
  return obj !== null && obj !== undefined && typeof obj.message === 'string'
}

const addEvent = async (eventId: number) => {
  try {
    const { data: responseData } = await client.post(Routes.ADD_EVENT, {
      eventId,
    })
    if (isModifyEventsResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useAddEventAPI = () => {
  const queryClient = useQueryClient()

  return useMutation<ModifyEventsResponse, ErrorAPI, number>({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileInfo'],
      })
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      })
    },
  })
}

const removeEvent = async (eventId: number) => {
  try {
    const { data: responseData } = await client.delete(Routes.REMOVE_EVENT, {
      data: { eventId },
    })
    if (isModifyEventsResponse(responseData)) {
      return responseData
    }
    throw intoErrorAPI(responseData)
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useRemoveEventAPI = () => {
  const queryClient = useQueryClient()

  return useMutation<ModifyEventsResponse, ErrorAPI, number>({
    mutationFn: removeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileInfo'],
      })
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      })
    },
  })
}
