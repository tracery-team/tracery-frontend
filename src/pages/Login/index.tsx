import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { memo, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginAPI } from './api'
import { useNavigate } from 'react-router'
import { extractMessage } from '../../lib'
import { useRouteProtection } from '../../hooks/useRouteProtection'

const REDIRECT_ROUTE = '/'
const SIGNUP_ROUTE = '/auth/sign-up'

type LoginFormValues = {
  login: string
  password: string
}

const Login = () => {
  useRouteProtection({ authorized: false })

  const { register, handleSubmit, formState, reset } =
    useForm<LoginFormValues>()

  const { mutate, error, isError, isSuccess } = useLoginAPI()

  const navigate = useNavigate()
  useEffect(() => {
    if (!isSuccess) return
    reset()
    navigate(REDIRECT_ROUTE)
  }, [isSuccess, navigate, reset])

  type Handler = SubmitHandler<LoginFormValues>
  const handleLogin: Handler = useCallback(
    data => {
      mutate(data)
    },
    [mutate],
  )

  const handleSignUpLinkClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      navigate(SIGNUP_ROUTE)
    },
    [navigate],
  )

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
            type="password"
            {...register('password', {
              required: 'Please, provide your password',
            })}
            fullWidth
            error={Boolean(formState.errors.password)}
            helperText={formState.errors.password?.message}
          />
          <Button onClick={handleSubmit(handleLogin)}>Login</Button>
          <Button
            component="a"
            href={SIGNUP_ROUTE}
            onClick={handleSignUpLinkClick}
          >
            Don't have an account?
          </Button>
          {isError && (
            <Typography variant="subtitle1" color="error">
              {extractMessage(error)}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(Login)
