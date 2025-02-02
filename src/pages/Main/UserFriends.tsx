import { TextField, Paper, InputAdornment, Typography } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

const UserFriends = () => {
  const [search, setSearch] = useState('')

  type SearchChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  const handleChangeSearch = useCallback((event: SearchChange) => {
    const value = event.target.value
    setSearch(value)
  }, [])

  return (
    <Paper
      elevation={1}
      sx={{
        gridRow: '1/3',
        gridColumn: '2/3',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          gap: 1,
        }}
      >
        <Typography variant="h6">
          Your friends:
        </Typography>
        <TextField
          value={search}
          onChange={handleChangeSearch}
          variant="outlined"
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Paper>
  )
}

export default memo(UserFriends)
