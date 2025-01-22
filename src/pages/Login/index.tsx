import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { memo, useCallback } from 'react'
import useLoginState from './state'

const Login = () => {
  const { login, password, setLogin, setPassword } = useLoginState()

  type TextChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  const handleLoginChange = useCallback(
    (event: TextChange) => {
      const value = event.target.value
      setLogin(value)
    },
    [setLogin],
  )

  const handlePasswordChange = useCallback(
    (event: TextChange) => {
      const value = event.target.value
      setPassword(value)
    },
    [setPassword],
  )

  const handleLogin = useCallback(() => {
    // TODO:
  }, [])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={0.5}>
          <Typography variant="h2" component="h1">
            Welcome to Tracery
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Keep in contact with your friends offline
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <TextField
            label="Login"
            value={login}
            onChange={handleLoginChange}
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <Button onClick={handleLogin}>Login</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(Login)
