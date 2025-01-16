import { Box, Container, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About SproutStart
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your journey into farming begins here. Learn, grow, and connect with the farming community.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <RouterLink to="/learning" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
              <Typography variant="body2" color="text.secondary">Learning Center</Typography>
            </RouterLink>
            <RouterLink to="/stores" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
              <Typography variant="body2" color="text.secondary">Local Stores</Typography>
            </RouterLink>
            <RouterLink to="/community" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
              <Typography variant="body2" color="text.secondary">Community</Typography>
            </RouterLink>
            <RouterLink to="/plants" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
              <Typography variant="body2" color="text.secondary">Plant Guide</Typography>
            </RouterLink>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Follow us on social media for daily tips and updates
            </Typography>
            {/* Add social media icons/links here */}
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright '}
            <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              SproutStart
            </RouterLink>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
