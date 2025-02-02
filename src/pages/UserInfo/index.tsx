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

const UserProfilePage = () => {
  const [isFriend, setIsFriend] = useState(false)
  const [gridColors, setGridColors] = useState<string[]>([])

  const mockUserData = {
    avatarUrl: '/path/to/avatar.jpg',
    nickname: 'CoolUser123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
  }

  const mockFriends = [
    { name: 'Alice Johnson', avatarUrl: '/path/to/alice-avatar.jpg' },
    { name: 'Bob Smith', avatarUrl: '/path/to/bob-avatar.jpg' },
    { name: 'Charlie Davis', avatarUrl: '/path/to/charlie-avatar.jpg' },
    { name: 'Darth Vader', avatarUrl: '/path/to/darth-avatar.jpg' },
  ]

  const mockEvents = [
    { title: 'Music Festival 2025', date: 'Feb 1, 2025' },
    { title: 'Tech Conference 2025', date: 'Mar 10, 2025' },
    { title: 'Art Exhibition 2025', date: 'Apr 15, 2025' },
    { title: 'Gaming Convention 2025', date: 'May 20, 2025' },
  ]

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
      {/* Grid Background */}
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

      {/* Profile Header */}
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
        <Button
          onClick={() => setIsFriend(!isFriend)}
          sx={{ position: 'absolute', top: 20, right: 30 }}
          color={isFriend ? 'error' : 'primary'}
          variant="contained"
        >
          {isFriend ? 'Remove Friend' : 'Add Friend'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={mockUserData.avatarUrl}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {mockUserData.nickname}
            </Typography>
            <Typography variant="body1">
              {mockUserData.firstName} {mockUserData.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {mockUserData.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          width: '90%',
          maxWidth: '1000px', 
        }}
      >
        {/* User's Events Section */}
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

        {/* User's Friends Section */}
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
          <List>
            {mockFriends.map((friend, index) => (
              <ListItem key={index}>
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

export default memo(UserProfilePage)
