import { memo, useState, useEffect, useMemo, useCallback } from 'react'
import {
  Button,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip,
  ListItemAvatar,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useUserInfoAPI } from './api'
import noUser from '../../assets/no-user.png'
import { useRouteProtection } from '../../hooks/useRouteProtection'
import {
  useAddFriendAPI,
  useProfileInfoAPI,
  useRemoveFriendAPI,
} from '../Main/api'

const UserProfilePage = () => {
  useRouteProtection({ authorized: true })

  const { data: profileInfo } = useProfileInfoAPI()
  const { mutate: addFriend } = useAddFriendAPI()
  const { mutate: removeFriend } = useRemoveFriendAPI()

  const { id } = useParams()
  const { data } = useUserInfoAPI(id)

  // TODO: replace with real events later
  const mockEvents = [
    { title: 'Music Festival 2025', date: 'Feb 1, 2025' },
    { title: 'Tech Conference 2025', date: 'Mar 10, 2025' },
    { title: 'Art Exhibition 2025', date: 'Apr 15, 2025' },
    { title: 'Gaming Convention 2025', date: 'May 20, 2025' },
  ]

  const isFriend = useMemo(() => {
    if (!profileInfo) return false
    for (const { id: friendId } of profileInfo.friends) {
      if (friendId === data?.id) return true
    }
    return false
  }, [profileInfo, data])

  // generating background
  const [gridColors, setGridColors] = useState<string[]>([])
  const getRandomColor = (rowIndex: number) => {
    const intensity = Math.min(1, rowIndex / 20)
    return `rgba(169, 169, 190, ${Math.random() * intensity * 0.4 + 0.05})`
  }
  useEffect(() => {
    const savedColors = localStorage.getItem('gridColors')
    if (savedColors) {
      setGridColors(JSON.parse(savedColors))
    } else {
      const newGridColors = Array.from({ length: 400 }).map((_, index) => {
        const rowIndex = Math.floor(index / 20)
        return Math.random() > 0.7 ? getRandomColor(rowIndex) : 'transparent'
      })
      setGridColors(newGridColors)
      localStorage.setItem('gridColors', JSON.stringify(newGridColors))
    }
  }, [])

  const navigate = useNavigate()
  const gotoUserDetails = useCallback((userId: number) => {
    navigate(`/info/user/${userId}`)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 1fr)',
          gridTemplateRows: 'repeat(20, 1fr)',
          gap: 0,
          zIndex: -1,
          backgroundColor: 'rgba(255, 255, 255, 0.005)',
        }}
      >
        {gridColors.map((color, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: color,
              border: '1px solid rgba(169, 169, 190, 0.1)',
            }}
          />
        ))}
      </Box>

      <Paper
        sx={{
          width: '90%',
          maxWidth: '1000px',
          padding: 3,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
          backdropFilter: 'blur(5px)',
        }}
      >
        {data && profileInfo?.id !== data?.id && (
          <Button
            onClick={() =>
              isFriend ? removeFriend(data.id) : addFriend(data.id)
            }
            sx={{ position: 'absolute', top: 20, right: 30 }}
            color={isFriend ? 'error' : 'primary'}
            variant="contained"
          >
            {isFriend ? 'Remove Friend' : 'Add Friend'}
          </Button>
        )}

        {data && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar src={noUser} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {data.nickname}
              </Typography>
              <Typography variant="body1">
                {data.firstName} {data.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {data.email}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          width: '90%',
          maxWidth: '1000px',
        }}
      >
        <Paper
          sx={{
            flex: 2,
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(5px)',
            height: '400px',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Events
          </Typography>
          <List>
            {mockEvents.map((event, index) => (
              <ListItem key={index}>
                <ListItemText primary={event.title} secondary={event.date} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper
          sx={{
            flex: 1,
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: 'rgba(241, 241, 241, 0.8)',
            backdropFilter: 'blur(5px)',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Friends
          </Typography>
          {data && (
            <List>
              {data.friends.map((friend, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Tooltip title="See user's profile">
                      <Avatar
                        sx={{ cursor: 'pointer' }}
                        onClick={() => gotoUserDetails(friend.id)}
                        alt="User Icon"
                        src={noUser}
                      />
                    </Tooltip>
                  </ListItemAvatar>

                  <ListItemText
                    primary={friend.nickname}
                    secondary={`${friend.firstName} ${friend.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(UserProfilePage)
