import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { useApp } from '../context/AppContext';

const LocalStores = () => {
  const { userLocation } = useApp();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Local Farming Stores
        </Typography>
        
        <Typography variant="body1" paragraph>
          Find farming supplies and equipment in stores near you.
        </Typography>

        <Grid container spacing={3}>
          {/* Placeholder for store listings */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Store Locator Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're working on bringing you the best local farming stores in your area.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LocalStores;
