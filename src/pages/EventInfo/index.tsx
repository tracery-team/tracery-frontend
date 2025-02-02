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
  ListItemAvatar,
  Tooltip,
  Alert,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useEventInfoAPI } from './api'
import {
  useAddEventAPI,
  useProfileInfoAPI,
  useRemoveEventAPI,
} from '../Main/api'
import noUser from '../../assets/no-user.png'

const EventInfoPage = () => {
  const { data: profileInfo } = useProfileInfoAPI()
  const { mutate: addEvent } = useAddEventAPI()
  const { mutate: removeEvent } = useRemoveEventAPI()

  const myEventIDs = useMemo(() => {
    if (!profileInfo) return []
    return profileInfo.events.map(({ id }) => id)
  }, [profileInfo])
  const myFriendIDs = useMemo(() => {
    if (!profileInfo) return []
    return profileInfo.friends.map(({ id }) => id)
  }, [profileInfo])

  const { id } = useParams()
  const { data: eventData } = useEventInfoAPI(id)

  const friendsParticipating = useMemo(() => {
    if (!eventData) return []
    return eventData.users.filter(({ id }) => myFriendIDs.includes(id))
  }, [eventData, myFriendIDs])

  const meParticipating = useMemo(() => {
    if (!eventData) return false
    return myEventIDs.includes(eventData?.id)
  }, [eventData, myEventIDs])

  // Generating background
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
      <Button
        onClick={() => navigate('/')}
        sx={{ position: 'fixed', top: 16, left: 16 }}
        variant="outlined"
      >
        Back home
      </Button>

      {/* 🔹 Grid Background */}
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

      {/* 🔹 Event Title Section */}
      <Paper
        sx={{
          width: '90%',
          maxWidth: '1000px',
          padding: 3,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
          backdropFilter: 'blur(5px)',
          position: 'relative',
        }}
      >
        {eventData && (
          <Button
            onClick={() =>
              meParticipating
                ? removeEvent(eventData.id)
                : addEvent(eventData.id)
            }
            variant="contained"
            color="primary"
            sx={{
              position: 'absolute',
              top: 20,
              right: 30,
            }}
          >
            {meParticipating ? 'Remove Event' : 'Add Event'}
          </Button>
        )}

        {eventData && (
          <Typography variant="h3" fontWeight="bold" color="primary">
            {eventData.title}
          </Typography>
        )}
      </Paper>

      {/* 🔹 Main Content (Event Info + Friends List) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 3,
          width: '90%',
          maxWidth: '1000px',
        }}
      >
        {/* 🔹 Event Details (Left Side) */}
        {eventData && (
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
            <Typography
              variant="h5"
              fontWeight="bold"
              color="secondary"
              gutterBottom
            >
              Event Details
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              {eventData.description}
            </Typography>

            <Typography variant="h6">Location</Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              📍 {eventData.location}
            </Typography>

            <Typography variant="h6">Date & Time</Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              📅 {eventData.date}
            </Typography>
          </Paper>
        )}

        {/* 🔹 Friends Participating (Right Side) */}
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
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Friends Participating
          </Typography>
          {friendsParticipating.length <= 0 && (
            <Alert severity="info">
              No friends participating in this event
            </Alert>
          )}
          <List>
            {friendsParticipating.map((friend, index) => (
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
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(EventInfoPage)
