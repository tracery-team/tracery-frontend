export type SignupApiData = {
  nickname: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export const signupApi = async (data: SignupApiData) => {
  const response = await fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Sign-up failed')
  }

  return response.json()
}
