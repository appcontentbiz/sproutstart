import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Plant Guide',
      description: 'Learn about different plants and how to grow them successfully.',
      image: '/assets/images/plant-guide.jpg',
      path: '/plant-guide'
    },
    {
      title: 'Farming Styles',
      description: 'Explore various farming techniques and methods.',
      image: '/assets/images/farming-styles.jpg',
      path: '/farming-styles'
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides for beginner farmers.',
      image: '/assets/images/tutorials.jpg',
      path: '/tutorials'
    },
    {
      title: 'Local Resources',
      description: 'Find farming supplies and equipment near you.',
      image: '/assets/images/local-stores.jpg',
      path: '/store-locator'
    }
  ];

  return (
    <Box>
      <HeroSection />
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Community Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Join Our Community
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/events')}
              >
                Upcoming Events
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/mentors')}
              >
                Find a Mentor
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
