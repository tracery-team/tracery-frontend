import { Paper } from '@mui/material'
import { memo } from 'react'

const UserEvents = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        gridRow: '2/3',
        gridColumn: '1/2',
      }}
    ></Paper>
  )
}

export default memo(UserEvents)
