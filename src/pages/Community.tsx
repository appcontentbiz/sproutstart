import { Box, Typography, Container, Grid, Card, CardContent, Button, Avatar } from '@mui/material';
import { useApp } from '../context/AppContext';

const mockMentors = [
  {
    name: 'Sarah Johnson',
    specialty: 'Organic Farming',
    experience: '15 years'
  },
  {
    name: 'Mike Chen',
    specialty: 'Hydroponics',
    experience: '8 years'
  },
  {
    name: 'Emma Davis',
    specialty: 'Urban Farming',
    experience: '10 years'
  }
];

const mockEvents = [
  {
    title: 'Beginner Farming Workshop',
    date: '2025-02-01',
    location: 'Community Center'
  },
  {
    title: 'Seasonal Planting Guide',
    date: '2025-02-15',
    location: 'Local Farm'
  }
];

const Community = () => {
  const { userLocation } = useApp();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Farming Community
        </Typography>
        
        <Typography variant="body1" paragraph>
          Connect with local mentors and join farming events in your area.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Local Mentors
          </Typography>
          <Grid container spacing={3}>
            {mockMentors.map((mentor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }}>{mentor.name[0]}</Avatar>
                      <Typography variant="h6">
                        {mentor.name}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      Specialty: {mentor.specialty}
                    </Typography>
                    <Typography color="text.secondary">
                      Experience: {mentor.experience}
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      Contact Mentor
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {mockEvents.map((event, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {event.title}
                    </Typography>
                    <Typography color="text.secondary">
                      Date: {event.date}
                    </Typography>
                    <Typography color="text.secondary">
                      Location: {event.location}
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Community;
