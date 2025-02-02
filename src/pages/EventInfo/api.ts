import { useQuery } from '@tanstack/react-query'
import { client } from '../../http-client'
import { ErrorAPI, propagateErrorAPI } from '../../lib'
import { EventResponse } from '../Main/api'

const EVENT_INFO_ROUTE = '/event'

const fetchEventInfo = async (id: number) => {
  const route = `${EVENT_INFO_ROUTE}/${id}`
  try {
    const { data: responseData } = await client.get(route)
    // TODO: implement validation later
    return responseData as EventResponse
  } catch (error: any) {
    throw propagateErrorAPI(error)
  }
}

export const useEventInfoAPI = (id: string | undefined) => {
  return useQuery<EventResponse, ErrorAPI>({
    queryKey: ['eventInfo', id],
    queryFn: () => fetchEventInfo(Number(id)),
    enabled: id !== undefined,
  })
}
