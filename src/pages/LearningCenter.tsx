import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

const learningTopics = [
  {
    title: 'Farming Styles',
    description: 'Learn about different farming methods and choose what works best for you.',
    image: '/images/farming-styles.jpg'
  },
  {
    title: 'Soil Types',
    description: 'Understand different soil types and how they affect plant growth.',
    image: '/images/soil-types.jpg'
  },
  {
    title: 'Growing Seasons',
    description: 'Plan your farming calendar with our seasonal growing guide.',
    image: '/images/growing-seasons.jpg'
  }
];

const LearningCenter = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Learning Center
        </Typography>
        
        <Typography variant="body1" paragraph>
          Start your farming journey with our comprehensive guides and tutorials.
        </Typography>

        <Grid container spacing={3}>
          {learningTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      backgroundColor: 'grey.300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {topic.title} Image
                    </Typography>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6">
                      {topic.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LearningCenter;
