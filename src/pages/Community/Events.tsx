import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'meetup' | 'seminar' | 'market';
  image: string;
  attendees: number;
  organizer: {
    name: string;
    avatar: string;
  };
  isSaved?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Organic Farming Workshop',
    description: 'Learn the basics of organic farming from experienced practitioners. Topics include soil health, natural pest control, and crop rotation.',
    date: '2025-02-01',
    time: '10:00 AM',
    location: 'Green Valley Farm',
    type: 'workshop',
    image: '/images/events/organic-workshop.jpg',
    attendees: 25,
    organizer: {
      name: 'Sarah Green',
      avatar: '/images/avatars/sarah.jpg'
    }
  },
  {
    id: '2',
    title: 'Farmers Market Setup',
    description: 'Join us for a comprehensive guide on setting up and managing your farmers market stall.',
    date: '2025-02-15',
    time: '9:00 AM',
    location: 'Downtown Market Square',
    type: 'seminar',
    image: '/images/events/market-setup.jpg',
    attendees: 40,
    organizer: {
      name: 'Mike Johnson',
      avatar: '/images/avatars/mike.jpg'
    }
  },
  // Add more mock events as needed
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleSaveEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isSaved: !event.isSaved }
        : event
    ));
  };

  const handleRegister = (eventId: string) => {
    // Implement registration logic
    console.log('Registering for event:', eventId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Community Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and join farming events in your area
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              startIcon={<FilterListIcon />}
              sx={{ mr: 1 }}
            >
              Filter
            </Button>
            <Button variant="contained">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="All Events" />
        <Tab label="Workshops" />
        <Tab label="Meetups" />
        <Tab label="Markets" />
        <Tab label="Saved" />
      </Tabs>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleEventClick(event)}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={event.type}
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<GroupIcon />}
                    label={`${event.attendees} attending`}
                    size="small"
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarTodayIcon sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.date} at {event.time}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={event.organizer.avatar}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="body2">
                      {event.organizer.name}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleSaveEvent(event.id)}
                    >
                      {event.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>
              {selectedEvent.title}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedEvent.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    <Typography>
                      {selectedEvent.date} at {selectedEvent.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GroupIcon sx={{ mr: 1 }} />
                    <Typography>
                      {selectedEvent.attendees} people attending
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={selectedEvent.organizer.avatar}
                      sx={{ mr: 1 }}
                    />
                    <Typography>
                      Organized by {selectedEvent.organizer.name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleRegister(selectedEvent.id)}
              >
                Register
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Events;
