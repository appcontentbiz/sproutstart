import React from 'react';
import { Box, Container, Typography, Grid, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroImage = styled('div')(({ theme }) => ({
  height: '600px',
  width: '100%',
  position: 'relative',
  backgroundImage: 'url("/assets/images/beginner-farmer.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  width: '100%',
  padding: theme.spacing(2),
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '300px',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const FeatureImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const FeatureOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  color: 'white',
}));

const HeroSection: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      title: 'Learn Farming Basics',
      description: 'Step-by-step guides for beginners',
      image: '/assets/images/learning-basics.jpg',
    },
    {
      title: 'Community Support',
      description: 'Connect with experienced farmers',
      image: '/assets/images/community.jpg',
    },
    {
      title: 'Garden Planning',
      description: 'Start your first garden project',
      image: '/assets/images/garden-planning.jpg',
    },
    {
      title: 'Local Resources',
      description: 'Find supplies and support nearby',
      image: '/assets/images/local-store.jpg',
    },
  ];

  return (
    <Box>
      <HeroImage>
        <ImageOverlay>
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              Start Your Farming Journey
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                marginBottom: 4,
                fontWeight: 300,
              }}
            >
              Your friendly guide to beginning farming and gardening
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                padding: '12px 32px',
                fontSize: '1.2rem',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Get Started
            </Button>
          </Container>
        </ImageOverlay>
      </HeroImage>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Begin Your Journey
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <FeatureImage src={feature.image} alt={feature.title} />
                <FeatureOverlay>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">
                    {feature.description}
                  </Typography>
                </FeatureOverlay>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
