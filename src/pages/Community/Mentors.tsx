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
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Mentor {
  id: string;
  name: string;
  title: string;
  location: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviews: number;
  bio: string;
  image: string;
  certifications: string[];
  availability: {
    nextAvailable: string;
    schedule: string[];
  };
  education: string[];
  achievements: string[];
  hourlyRate: number;
  languages: string[];
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Emily Parker',
    title: 'Organic Farming Specialist',
    location: 'California, USA',
    specialties: ['Organic Farming', 'Soil Health', 'Crop Rotation'],
    experience: 15,
    rating: 4.8,
    reviews: 127,
    bio: 'With over 15 years of experience in organic farming, I specialize in helping beginners establish sustainable farming practices. My approach combines traditional wisdom with modern techniques.',
    image: '/images/mentors/emily.jpg',
    certifications: ['Certified Organic Farmer', 'Master Gardener'],
    availability: {
      nextAvailable: '2025-01-20',
      schedule: ['Mon-Wed: 9AM-5PM', 'Thu: 1PM-6PM']
    },
    education: [
      'Ph.D. in Agricultural Science',
      'M.S. in Soil Biology'
    ],
    achievements: [
      'Published author of "Organic Farming Basics"',
      'Featured speaker at Agricultural conferences'
    ],
    hourlyRate: 75,
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Urban Farming Expert',
    location: 'New York, USA',
    specialties: ['Urban Farming', 'Hydroponics', 'Vertical Gardening'],
    experience: 10,
    rating: 4.9,
    reviews: 89,
    bio: 'Passionate about bringing farming to urban spaces. I help city dwellers create productive gardens in limited spaces using innovative techniques.',
    image: '/images/mentors/james.jpg',
    certifications: ['Urban Agriculture Specialist', 'Hydroponic Systems Expert'],
    availability: {
      nextAvailable: '2025-01-18',
      schedule: ['Tue-Fri: 10AM-6PM', 'Sat: 9AM-2PM']
    },
    education: [
      'B.S. in Horticulture',
      'Certificate in Urban Agriculture'
    ],
    achievements: [
      'Designed 50+ successful urban farms',
      'Featured in Urban Farming Magazine'
    ],
    hourlyRate: 65,
    languages: ['English']
  },
  // Add more mock mentors
];

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setOpenDialog(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleBookSession = (mentorId: string) => {
    // Implement booking logic
    console.log('Booking session with mentor:', mentorId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Find a Mentor
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with experienced farmers and get personalized guidance
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search mentors by name, specialty, or location..."
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
          </Grid>
        </Grid>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="All Mentors" />
        <Tab label="Organic Farming" />
        <Tab label="Urban Farming" />
        <Tab label="Sustainable Practices" />
        <Tab label="Favorites" />
      </Tabs>

      <Grid container spacing={3}>
        {mentors.map((mentor) => (
          <Grid item xs={12} md={6} lg={4} key={mentor.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={mentor.image}
                alt={mentor.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleMentorClick(mentor)}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ mr: 1 }}>
                      {mentor.name}
                    </Typography>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 20 }} />
                  </Box>
                  <Chip
                    icon={<StarIcon />}
                    label={mentor.rating}
                    size="small"
                    color="primary"
                  />
                </Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {mentor.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2" color="text.secondary">
                    {mentor.location}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  {mentor.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {mentor.bio.substring(0, 150)}...
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="primary">
                    ${mentor.hourlyRate}/hour
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<MessageIcon />}
                    onClick={() => handleMentorClick(mentor)}
                  >
                    Contact
                  </Button>
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
        {selectedMentor && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">
                  {selectedMentor.name}
                </Typography>
                <Rating value={selectedMentor.rating} precision={0.1} readOnly />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <img
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Availability
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarTodayIcon sx={{ mr: 1, fontSize: 'small' }} />
                      <Typography variant="body2">
                        Next available: {selectedMentor.availability.nextAvailable}
                      </Typography>
                    </Box>
                    {selectedMentor.availability.schedule.map((time, index) => (
                      <Typography key={index} variant="body2" color="text.secondary">
                        {time}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph>
                    {selectedMentor.bio}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Experience & Education
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <WorkIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${selectedMentor.experience} years of experience`}
                          />
                        </ListItem>
                        {selectedMentor.education.map((edu, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary={edu} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Certifications
                      </Typography>
                      <List dense>
                        {selectedMentor.certifications.map((cert, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={cert} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Achievements
                  </Typography>
                  <List dense>
                    {selectedMentor.achievements.map((achievement, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleBookSession(selectedMentor.id)}
                startIcon={<CalendarTodayIcon />}
              >
                Book Session
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Mentors;
