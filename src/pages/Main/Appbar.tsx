import { AppBar, Toolbar, Typography } from '@mui/material'
import { memo } from 'react'

const Appbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Dashboard</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Appbar)
