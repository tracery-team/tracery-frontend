import {
  Paper,
  TextField,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
} from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router' // Import Link for navigation
import AddIcon from '@mui/icons-material/Add' // Add icon
import RemoveIcon from '@mui/icons-material/Remove' // Remove icon
import useDebounce from '../../hooks/useDebounce'
import {
  useAddEventAPI,
  useProfileInfoAPI,
  useRemoveEventAPI,
  useSearchEventsAPI,
} from './api'
import ImageIcon from '@mui/icons-material/Image'

const UserEvents = () => {
  const [search, setSearch] = useState('')
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const debouncedSearch = useDebounce(search, 500)

  const {
    data: searchEvents,
    error,
    isLoading,
  } = useSearchEventsAPI(1, debouncedSearch)

  const { data: profileInfo } = useProfileInfoAPI()
  const myEventIDs = useMemo(() => {
    if (!profileInfo) return []
    return profileInfo.events.map(({ id }) => id)
  }, [profileInfo])
  const myFriendIDs = useMemo(() => {
    if (!profileInfo) return []
    return profileInfo.friends.map(({ id }) => id)
  }, [profileInfo])

  const [eventsParticipated, eventsNotParticipated] = useMemo(() => {
    if (!searchEvents) return [[], []]
    const participated = []
    const notParticipated = []
    for (const event of searchEvents) {
      if (myEventIDs.includes(event.id)) {
        participated.push(event)
      } else {
        notParticipated.push(event)
      }
    }
    return [participated, notParticipated]
  }, [searchEvents, myEventIDs])

  const { mutate: addEvent } = useAddEventAPI()
  const { mutate: removeEvent } = useRemoveEventAPI()

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
        {isLoading && <CircularProgress sx={{ padding: 2 }} color="primary" />}
        {error && (
          <Alert sx={{ padding: 2 }} severity="error">
            Failed to fetch events
          </Alert>
        )}
        {searchEvents && searchEvents.length <= 0 && (
          <Alert sx={{ margin: 2 }} severity="info">
            Haven't found any events
          </Alert>
        )}
        {searchEvents &&
          [...eventsParticipated, ...eventsNotParticipated].map(event => (
            <Tooltip
              title={
                event.users.filter(({ id }) => myFriendIDs.includes(id))
                  .length + ' of your friends are participating'
              }
            >
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    minHeight: '150px',
                  }}
                >
                  {/* Banner Image (clickable) */}
                  <Link
                    to={`/info/event/${event.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ImageIcon
                      color={myEventIDs.includes(event.id) ? 'success' : 'info'}
                      sx={{
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </Link>

                  {/* Event Info */}
                  <div>
                    {/* Title (clickable) */}
                    <Link
                      to={`/info/event/${event.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography variant="h6" sx={{ color: '#333' }}>
                        {event.title}
                      </Typography>
                    </Link>
                    {/* Description (clickable) */}
                    <Link
                      to={`/info/event/${event.id}`}
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
                      if (myEventIDs.includes(event.id)) {
                        removeEvent(event.id)
                      } else {
                        addEvent(event.id)
                      }
                    }}
                  >
                    {myEventIDs.includes(event.id) ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </Paper>
              </Grid>
            </Tooltip>
          ))}
      </Grid>
    </Paper>
  )
}

export default memo(UserEvents)
