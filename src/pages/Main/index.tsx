import { memo } from 'react'
import { useRouteProtection } from '../../hooks/useRouteProtection'
import { Box } from '@mui/material'
import Appbar from './Appbar'
import UserInformation from './UserInformation'
import UserFriends from './UserFriends'
import UserEvents from './UserEvents'

const Main = () => {
  useRouteProtection({ authorized: true })

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Appbar />
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 460px',
          gridTemplateRows: '2fr 3fr',
        }}
      >
        <UserInformation />
        <UserFriends />
        <UserEvents />
      </Box>
    </Box>
  )
}

export default memo(Main)
