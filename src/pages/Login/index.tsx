import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { memo, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginFormValues = {
  login: string
  password: string
}

const Login = () => {
  const { register, handleSubmit, formState, reset } =
    useForm<LoginFormValues>()

  const handleLogin: SubmitHandler<LoginFormValues> = useCallback(data => {
    // TODO:
    console.log(data)
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
            {...register('login', { required: 'Please, provide your login' })}
            fullWidth
            error={Boolean(formState.errors.login)}
            helperText={formState.errors.login?.message}
          />
          <TextField
            label="Password"
            {...register('password', {
              required: 'Please, provide your password',
            })}
            fullWidth
            error={Boolean(formState.errors.password)}
            helperText={formState.errors.password?.message}
          />
          <Button onClick={handleSubmit(handleLogin)}>Login</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(Login)
