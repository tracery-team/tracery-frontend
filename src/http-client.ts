import axios from 'axios'

export const client = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerJWT = (token: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const unregisterJWT = () => {
  delete client.defaults.headers.common['Authorization']
}
