import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpData, useSignUpAPI } from './api'
import { extractMessage } from '../../lib'
import { useNavigate } from 'react-router'

const LOGIN_ROUTE = '/auth/login'

const SignUp = () => {
  const { register, handleSubmit, formState, reset } = useForm<SignUpData>()

  const { mutate, error, isError, isSuccess } = useSignUpAPI()

  const navigate = useNavigate()
  const navigateToLogin = useCallback(() => {
    navigate(LOGIN_ROUTE)
  }, [navigate])

  useEffect(() => {
    if (!isSuccess) return
    reset()
    navigateToLogin()
  }, [isSuccess, navigateToLogin, reset])

  type Handler = SubmitHandler<SignUpData>
  const handleSignUp: Handler = useCallback(
    data => {
      mutate(data)
    },
    [mutate],
  )

  const handleLoginLinkClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      navigateToLogin()
    },
    [navigateToLogin],
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
            Create an Account
          </Typography>
          <Typography variant="h5" color="textSecondary">
            See what Tracery can offer for you
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <TextField
            label="Nickname"
            {...register('nickname', {
              required: 'Please, specify your nickname',
              pattern: /^[_a-zA-Z].*$/,
              minLength: 4,
              maxLength: 25,
            })}
            error={Boolean(formState.errors.nickname)}
            helperText={formState.errors.nickname?.message}
            fullWidth
          />
          <TextField
            label="First Name"
            {...register('firstName', {
              required: 'Please, specify your first name',
              pattern: /^[a-zA-Z]+$/,
              minLength: 2,
              maxLength: 25,
            })}
            error={Boolean(formState.errors.firstName)}
            helperText={formState.errors.firstName?.message}
            fullWidth
          />
          <TextField
            label="Last Name"
            {...register('lastName', {
              required: 'Please, specify your second name',
              pattern: /^[a-zA-Z]+$/,
              minLength: 2,
              maxLength: 25,
            })}
            error={Boolean(formState.errors.lastName)}
            helperText={formState.errors.lastName?.message}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            {...register('email', {
              required: 'Please, specify your email',
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            })}
            error={Boolean(formState.errors.email)}
            helperText={formState.errors.email?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register('password', {
              required: 'Please, specify your password',
              minLength: 8,
            })}
            error={Boolean(formState.errors.password)}
            helperText={formState.errors.password?.message}
            fullWidth
          />
          <Button onClick={handleSubmit(handleSignUp)}>Sign Up</Button>
          <Button
            component="a"
            href={LOGIN_ROUTE}
            onClick={handleLoginLinkClick}
          >
            Already have an account?
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

export default memo(SignUp)
