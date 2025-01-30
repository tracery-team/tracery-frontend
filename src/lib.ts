export type ErrorAPI = {
  message: string | string[]
  error: string
  statusCode: number
}

export const unknownErrorAPI: ErrorAPI = Object.freeze({
  message: ['unknown error'],
  error: 'Unknown Error',
  statusCode: 500,
})

export const isErrorAPI = (obj: any): obj is ErrorAPI => {
  return (
    obj !== null &&
    obj !== undefined &&
    (obj.message instanceof Array || typeof obj.message === 'string') &&
    typeof obj.error === 'string' &&
    typeof obj.statusCode === 'number'
  )
}

export const intoErrorAPI = (data: any) => {
  return isErrorAPI(data) ? data : unknownErrorAPI
}

export const extractMessage = ({ message }: ErrorAPI) => {
  const joined = typeof message === 'string' ? message : message.join(', ')
  return joined.replace(/^./, e => e.toUpperCase())
}
