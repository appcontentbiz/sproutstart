import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActionArea, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const mockPlants = [
  {
    name: 'Tomatoes',
    difficulty: 'Easy',
    growthTime: '60-80 days',
    description: 'Perfect for beginners, tomatoes are versatile and rewarding to grow.'
  },
  {
    name: 'Lettuce',
    difficulty: 'Easy',
    growthTime: '30-60 days',
    description: 'Quick growing and perfect for small spaces.'
  },
  {
    name: 'Carrots',
    difficulty: 'Moderate',
    growthTime: '70-80 days',
    description: 'Root vegetable that requires well-prepared soil.'
  },
  {
    name: 'Herbs',
    difficulty: 'Easy',
    growthTime: '20-30 days',
    description: 'Various herbs that can be grown indoors or outdoors.'
  }
];

const PlantGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = mockPlants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plant Growing Guide
        </Typography>
        
        <Typography variant="body1" paragraph>
          Learn how to grow different plants with our comprehensive guides.
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {filteredPlants.map((plant, index) => (
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
                      {plant.name} Image
                    </Typography>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6">
                      {plant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Difficulty: {plant.difficulty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Growth Time: {plant.growthTime}
                    </Typography>
                    <Typography variant="body2">
                      {plant.description}
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

export default PlantGuide;
