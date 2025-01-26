import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { memo, useCallback, useMemo } from 'react'
import useSignupState from './state'
import { useMutation } from '@tanstack/react-query'
import { signupApi, SignupApiData } from './api'

const SignUp = () => {
  const {
    nickname,
    firstName,
    lastName,
    email,
    password,
    repeatPassword,

    setNickname,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setRepeatPassword,
  } = useSignupState()

  type TextChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  const handleChange = useCallback((handler: (value: string) => void) => {
    return (event: TextChange) => {
      const value = event.target.value
      handler(value)
    }
  }, [])

  const passwordsMatch = password === repeatPassword

  const { mutate } = useMutation({
    mutationFn: signupApi,
    onSuccess: data => {
      console.log(data)
    },
  })

  const handleSignUp = useCallback(() => {
    if (!passwordsMatch) return
    mutate({
      nickname,
      firstName,
      lastName,
      email,
      password,
    })
  }, [passwordsMatch, nickname, firstName, lastName, email, password])

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
            value={nickname}
            onChange={handleChange(setNickname)}
            fullWidth
          />
          <TextField
            label="First Name"
            value={firstName}
            onChange={handleChange(setFirstName)}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={handleChange(setLastName)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleChange(setEmail)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
            fullWidth
          />
          <TextField
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={handleChange(setRepeatPassword)}
            fullWidth
          />
          <Button disabled={!passwordsMatch} onClick={handleSignUp}>
            Sign Up
          </Button>
          {!passwordsMatch && (
            <Typography variant="body1" color="error">
              Passwords don't match
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(SignUp)
