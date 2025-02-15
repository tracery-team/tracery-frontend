import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Main from './pages/Main'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import EventInfo from './pages/EventInfo'
import UserInfo from './pages/UserInfo'
import { css, Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route path="info">
            <Route path="event/:id" element={<EventInfo />} />
            <Route path="user/:id" element={<UserInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}
    />
  </StrictMode>,
)
