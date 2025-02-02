import { memo, useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material'

const EventInfoPage = () => {
  const mockEventData = {
    title: 'Music Festival 2025 🎶',
    description: `Join us for an unforgettable experience at the Music Festival 2025! 
                  Enjoy live performances from top artists, delicious food stalls, and an amazing atmosphere.
                  Don't miss out on the biggest music event of the year!`,
    location: 'Central Park, New York City',
    date: 'Saturday, February 1, 2025 - 6:00 PM',
  }

  const mockFriends = [
    { name: 'Alice Johnson', avatarUrl: '/path/to/alice-avatar.jpg' },
    { name: 'Bob Smith', avatarUrl: '/path/to/bob-avatar.jpg' },
    { name: 'Charlie Davis', avatarUrl: '/path/to/charlie-avatar.jpg' },
    { name: 'Darth Vader', avatarUrl: '/path/to/darth-avatar.jpg' },
  ]

  const [eventData] = useState(mockEventData)
  const [gridColors, setGridColors] = useState<string[]>([])

  const handleSubmit = () => {
    console.log('Event Added:', eventData)
  }

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
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            top: 20,
            right: 30,
          }}
        >
          Add Event
        </Button>

        <Typography variant="h3" fontWeight="bold" color="primary">
          {eventData.title}
        </Typography>
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

          <List>
            {mockFriends.map((friend, index) => (
              <ListItem key={index} sx={{ padding: '10px 0' }}>
                <Avatar src={friend.avatarUrl} sx={{ marginRight: 2 }} />
                <ListItemText primary={friend.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(EventInfoPage)
