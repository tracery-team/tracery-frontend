import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpData, useSignUpAPI } from './api'
import { extractMessage } from '../../lib'
import { useNavigate } from 'react-router'
import { useRouteProtection } from '../../hooks/useRouteProtection'

const LOGIN_ROUTE = '/auth/login'

const SignUp = () => {
  useRouteProtection({ authorized: false })

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
              pattern: {
                value: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
                message: 'Nickname does not match the pattern',
              },
              minLength: {
                value: 4,
                message: 'Nickname should be at least 4 characters long',
              },
              maxLength: {
                value: 25,
                message: 'Nickname should be at max 25 characters long',
              },
            })}
            error={Boolean(formState.errors.nickname)}
            helperText={formState.errors.nickname?.message}
            fullWidth
          />
          <TextField
            label="First Name"
            {...register('firstName', {
              required: 'Please, specify your first name',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Your first name should contain only letters',
              },
              minLength: {
                value: 2,
                message: 'Your first name should be at least 2 characters long',
              },
              maxLength: {
                value: 25,
                message: 'Your first name should be at max 25 characters long',
              },
            })}
            error={Boolean(formState.errors.firstName)}
            helperText={formState.errors.firstName?.message}
            fullWidth
          />
          <TextField
            label="Last Name"
            {...register('lastName', {
              required: 'Please, specify your last name',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Your last name should contain only letters',
              },
              minLength: {
                value: 2,
                message: 'Your last name should be at least 2 characters long',
              },
              maxLength: {
                value: 25,
                message: 'Your last name should be at max 25 characters long',
              },
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
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: 'This is not an email',
              },
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
              minLength: {
                value: 8,
                message: 'Your password should be at least 8 characters long',
              },
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
