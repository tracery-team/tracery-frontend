import {
  TextField,
  Paper,
  InputAdornment,
  Typography,
  List,
  Alert,
  CircularProgress,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Tooltip,
} from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  useAddFriendAPI,
  usePotentialFriendSearchAPI,
  useProfileInfoAPI,
  useRemoveFriendAPI,
} from './api'
import noUser from '../../assets/no-user.png'
import useDebounce from '../../hooks/useDebounce'
import { useNavigate } from 'react-router'

const UserFriends = () => {
  const [search, setSearch] = useState('')

  type SearchChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  const handleChangeSearch = useCallback((event: SearchChange) => {
    const value = event.target.value
    setSearch(value)
  }, [])

  const debouncedSearch = useDebounce(search, 500)
  const { data, error, isLoading } = usePotentialFriendSearchAPI(
    1,
    debouncedSearch,
  )

  const { data: profileInfo } = useProfileInfoAPI()
  const friendIDs = useMemo(() => {
    if (!profileInfo) return []
    return profileInfo.friends.map(({ id }) => id)
  }, [profileInfo])

  const [friends, potential] = useMemo(() => {
    if (!data) return [[], []]
    const already = []
    const yet = []
    for (const user of data) {
      if (user.id === profileInfo?.id) continue
      if (friendIDs.includes(user.id)) {
        already.push(user)
      } else {
        yet.push(user)
      }
    }
    return [already, yet]
  }, [data, friendIDs, profileInfo])

  const { mutate: addFriend } = useAddFriendAPI()
  const { mutate: removeFriend } = useRemoveFriendAPI()

  const navigate = useNavigate()
  const gotoUserDetails = useCallback((userId: number) => {
    navigate(`/info/user/${userId}`)
  }, [])

  return (
    <Paper
      elevation={1}
      sx={{
        gridRow: '1/3',
        gridColumn: '2/3',
        display: 'flex',
        flexDirection: 'column',
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
        <Typography variant="h6">Your friends:</Typography>
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
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: 'flex',

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading && <CircularProgress color="primary" />}
        {error && <Alert severity="error">Failed to load friends</Alert>}
        {!error && data && data.length <= 0 && (
          <Alert severity="info">No people were found</Alert>
        )}
        {!error && data && data.length > 0 && (
          <List sx={{ flex: 1, height: '100%' }}>
            {friends.map((user, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Tooltip title="See user's profile">
                    <Avatar
                      sx={{ cursor: 'pointer' }}
                      onClick={() => gotoUserDetails(user.id)}
                      alt="User Icon"
                      src={noUser}
                    />
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary={user.nickname}
                  secondary={`${user.firstName} ${user.lastName}`}
                />
                <ListItemSecondaryAction>
                  <Button color="error" onClick={() => removeFriend(user.id)}>
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {potential.map((user, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Tooltip title="See user's profile">
                    <Avatar
                      sx={{ cursor: 'pointer' }}
                      onClick={() => gotoUserDetails(user.id)}
                      alt="User Icon"
                      src={noUser}
                    />
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary={user.nickname}
                  secondary={`${user.firstName} ${user.lastName}`}
                />
                <ListItemSecondaryAction>
                  <Button onClick={() => addFriend(user.id)}>Add</Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Paper>
  )
}

export default memo(UserFriends)
