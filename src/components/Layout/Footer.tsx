import { Box, Container, Typography, Link, Grid } from '@mui/material';

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
            <Link href="/learning" color="text.secondary" display="block">Learning Center</Link>
            <Link href="/stores" color="text.secondary" display="block">Local Stores</Link>
            <Link href="/community" color="text.secondary" display="block">Community</Link>
            <Link href="/guide" color="text.secondary" display="block">Plant Guide</Link>
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
            {'Copyright © '}
            <Link color="inherit" href="/">
              SproutStart
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
