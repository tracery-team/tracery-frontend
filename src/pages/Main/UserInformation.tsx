import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Alert,
  Button,
} from '@mui/material'
import { useProfileInfoAPI } from './api'
import noUser from '../../assets/no-user.png'
import background from '../../assets/tracery-background-2.png'
import { useJWT } from '../../hooks/useJWT'
import { useCallback } from 'react'

const UserInformation = () => {
  const { data, error, isLoading } = useProfileInfoAPI()

  const { setToken } = useJWT()

  const handleLogout = useCallback(() => {
    setToken(null)
  }, [setToken])

  return (
    <Box
      sx={{
        gridRow: '1/2',
        gridColumn: '1/2',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: 'primary.main',
          borderRadius: 4,
          backgroundImage: `url(${background})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          gap: 1,
          position: 'relative',
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>

        {isLoading && <CircularProgress color="primary" />}

        {error && (
          <Alert severity="error">Failed to load user information.</Alert>
        )}

        {data && (
          <>
            <Avatar
              src={noUser}
              sx={{
                width: '125px',
                height: '125px',
              }}
            />
            <Typography variant="h4">{data.nickname}</Typography>
            <Typography variant="body1">
              {data.firstName} {data.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.email}
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default UserInformation
