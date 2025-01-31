import { useNavigate } from 'react-router'
import { useJWT } from './useJWT'
import { useEffect } from 'react'

const AUTHORIZED_REDIRECT_ROUTE = '/'
const UNAUTHORIZED_REDIRECT_ROUTE = '/auth/login'

export const useRouteProtection = ({ authorized }: { authorized: boolean }) => {
  const { token } = useJWT()

  const navigate = useNavigate()
  useEffect(() => {
    // if authorization is required
    if (authorized) {
      if (token !== null) return
      navigate(UNAUTHORIZED_REDIRECT_ROUTE)
      return
    }
    // if there should be no authorization
    if (token === null) return
    navigate(AUTHORIZED_REDIRECT_ROUTE)
  }, [token, authorized])
}
