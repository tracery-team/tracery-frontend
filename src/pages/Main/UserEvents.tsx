import { Paper, TextField, Grid, Typography, IconButton } from '@mui/material'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom' // Import Link for navigation
import AddIcon from '@mui/icons-material/Add' // Add icon
import RemoveIcon from '@mui/icons-material/Remove' // Remove icon

const UserEvents = () => {
  const [search, setSearch] = useState('')
  const [addedEvents, setAddedEvents] = useState<number[]>([])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const toggleEvent = (eventId: number) => {
    setAddedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId],
    )
  }

  const events = [
    {
      id: 1,
      title: 'Tech Conference',
      description: 'A conference about the latest in tech.',
      image: 'https://via.placeholder.com/400x200?text=Tech+Conference',
    },
    {
      id: 2,
      title: 'Music Festival',
      description: 'An amazing weekend with live music.',
      image: 'https://via.placeholder.com/400x200?text=Music+Festival',
    },
    {
      id: 3,
      title: 'Cooking Class',
      description: 'Learn how to cook like a pro.',
      image: 'https://via.placeholder.com/400x200?text=Cooking+Class',
    },
    {
      id: 4,
      title: 'Art Gallery Opening',
      description: 'A special opening event at the new art gallery.',
      image: 'https://via.placeholder.com/400x200?text=Art+Gallery+Opening',
    },
    {
      id: 5,
      title: 'Yoga Retreat',
      description: 'Relax and refresh your mind and body with yoga.',
      image: 'https://via.placeholder.com/400x200?text=Yoga+Retreat',
    },
    {
      id: 6,
      title: 'Science Expo',
      description: 'Explore the wonders of science at this expo.',
      image: 'https://via.placeholder.com/400x200?text=Science+Expo',
    },
  ]

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Paper
      elevation={2}
      sx={{
        gridRow: '2/3',
        gridColumn: '1/2',
        p: 2,
        overflowY: 'auto',
        width: '99%',
        maxHeight: '600px',
      }}
    >
      {/* Search Bar */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Events
      </Typography>
      <TextField
        label="Search Events"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* Event Grid */}
      <Grid container spacing={2}>
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Banner Image (clickable) */}
              <Link
                to={`/event/${event.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '16px',
                    backgroundColor: '#f0f0f0',
                  }}
                />
              </Link>

              {/* Event Info */}
              <div>
                {/* Title (clickable) */}
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography variant="h6" sx={{ color: '#333' }}>
                    {event.title}
                  </Typography>
                </Link>
                {/* Description (clickable) */}
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    {event.description}
                  </Typography>
                </Link>
              </div>

              {/* Add/Remove Button */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '50%',
                }}
                onClick={e => {
                  e.stopPropagation()
                  toggleEvent(event.id)
                }}
              >
                {addedEvents.includes(event.id) ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default memo(UserEvents)
