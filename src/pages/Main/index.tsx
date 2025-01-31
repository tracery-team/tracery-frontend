import { memo } from 'react'
import { useJWT } from '../../hooks/useJWT'
import { useRouteProtection } from '../../hooks/useRouteProtection'
import { Button } from '@mui/material'

const Main = () => {
  useRouteProtection({ authorized: true })

  const { setToken } = useJWT()

  return <Button onClick={() => setToken(null)}>Log Out</Button>
}

export default memo(Main)
