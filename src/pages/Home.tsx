import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Learning Center',
      description: 'Start your farming journey with comprehensive guides and tutorials.',
      image: '/images/learning.jpg',
      path: '/learning'
    },
    {
      title: 'Local Stores',
      description: 'Find farming supplies and equipment in stores near you.',
      image: '/images/store.jpg',
      path: '/stores'
    },
    {
      title: 'Community',
      description: 'Connect with fellow farmers and share experiences.',
      image: '/images/community.jpg',
      path: '/community'
    },
    {
      title: 'Plant Guide',
      description: 'Explore different plant types and growing techniques.',
      image: '/images/guide.jpg',
      path: '/guide'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to SproutStart
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Your journey into farming begins here. Whether you're starting with a small garden
            or dreaming of a full farm, we're here to guide you every step of the way.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/learning')}>
              Start Learning
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/guide')}>
              Explore Plants
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={6}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%', // 16:9
                    bgcolor: 'grey.200'
                  }}
                  // image={feature.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
