import React from 'react';
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import EcoIcon from '@mui/icons-material/Eco';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

interface FarmingStyle {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'Traditional' | 'Modern' | 'Urban' | 'Sustainable';
  spaceNeeded: 'Small' | 'Medium' | 'Large';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  challenges: string[];
  bestFor: string[];
  techniques: string[];
  tips: string[];
}

const farmingStyles: FarmingStyle[] = [
  {
    id: 1,
    name: 'Container Gardening',
    description: 'Perfect for urban dwellers, container gardening allows you to grow plants in pots and containers.',
    image: '/images/farming-styles/container.jpg',
    category: 'Urban',
    spaceNeeded: 'Small',
    difficulty: 'Beginner',
    benefits: [
      'Perfect for small spaces',
      'Portable gardens',
      'Easy to maintain',
      'Great for beginners'
    ],
    challenges: [
      'Limited root space',
      'Requires frequent watering',
      'Soil dries out quickly'
    ],
    bestFor: [
      'Apartments and balconies',
      'Small herbs and vegetables',
      'Decorative plants'
    ],
    techniques: [
      'Proper container selection',
      'Container-specific soil mix',
      'Strategic plant placement',
      'Regular fertilization'
    ],
    tips: [
      'Use containers with drainage holes',
      'Choose appropriate container sizes',
      'Monitor soil moisture daily',
      'Group plants with similar needs'
    ]
  },
  {
    id: 2,
    name: 'Hydroponic Growing',
    description: 'Soil-less growing method using nutrient-rich water solutions.',
    image: '/images/farming-styles/hydroponics.jpg',
    category: 'Modern',
    spaceNeeded: 'Small',
    difficulty: 'Intermediate',
    benefits: [
      'No soil needed',
      'Water efficient',
      'Higher yields',
      'Year-round growing'
    ],
    challenges: [
      'Initial setup cost',
      'Technical knowledge required',
      'System maintenance',
      'Power dependency'
    ],
    bestFor: [
      'Indoor growing',
      'Leafy greens',
      'Herbs',
      'Tomatoes'
    ],
    techniques: [
      'Deep Water Culture (DWC)',
      'Nutrient Film Technique (NFT)',
      'Ebb and Flow',
      'Aeroponics'
    ],
    tips: [
      'Monitor pH levels daily',
      'Keep water temperature stable',
      'Clean system regularly',
      'Use quality nutrients'
    ]
  }
  // Add more farming styles...
];

const FarmingStyles = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<FarmingStyle | null>(null);

  const categories = ['All', 'Traditional', 'Modern', 'Urban', 'Sustainable'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredStyles = farmingStyles.filter(style =>
    selectedTab === 0 || style.category === categories[selectedTab]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Farming Styles
      </Typography>
      <Typography variant="body1" paragraph>
        Explore different farming methods and find the perfect style for your needs.
      </Typography>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, index) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* Farming Styles Grid */}
      <Grid container spacing={3}>
        {filteredStyles.map((style) => (
          <Grid item key={style.id} xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s',
                  boxShadow: 4
                }
              }}
              onClick={() => setSelectedStyle(style)}
            >
              <CardMedia
                component="img"
                height="200"
                image={style.image}
                alt={style.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {style.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {style.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<AgricultureIcon />}
                    label={style.category}
                    size="small"
                  />
                  <Chip
                    icon={<HomeIcon />}
                    label={`${style.spaceNeeded} Space`}
                    size="small"
                  />
                  <Chip
                    label={style.difficulty}
                    size="small"
                    color={
                      style.difficulty === 'Beginner' ? 'success' :
                      style.difficulty === 'Intermediate' ? 'warning' : 'error'
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Detailed View Dialog */}
      <Dialog
        open={Boolean(selectedStyle)}
        onClose={() => setSelectedStyle(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedStyle && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedStyle.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip size="small" label={selectedStyle.category} />
                <Chip size="small" label={`${selectedStyle.spaceNeeded} Space`} />
                <Chip
                  size="small"
                  label={selectedStyle.difficulty}
                  color={
                    selectedStyle.difficulty === 'Beginner' ? 'success' :
                    selectedStyle.difficulty === 'Intermediate' ? 'warning' : 'error'
                  }
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                height="300"
                image={selectedStyle.image}
                alt={selectedStyle.name}
                sx={{ borderRadius: 1, mb: 2 }}
              />
              
              <Typography variant="body1" paragraph>
                {selectedStyle.description}
              </Typography>

              <Grid container spacing={3}>
                {/* Benefits */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="success.main">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon />
                      Benefits
                    </Box>
                  </Typography>
                  <List dense>
                    {selectedStyle.benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Challenges */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="warning.main">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningIcon />
                      Challenges
                    </Box>
                  </Typography>
                  <List dense>
                    {selectedStyle.challenges.map((challenge, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={challenge} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Best For */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EcoIcon color="primary" />
                      Best For
                    </Box>
                  </Typography>
                  <List dense>
                    {selectedStyle.bestFor.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <EcoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Techniques */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AgricultureIcon color="primary" />
                      Key Techniques
                    </Box>
                  </Typography>
                  <List dense>
                    {selectedStyle.techniques.map((technique, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <AgricultureIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={technique} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Tips */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon color="info" />
                      Pro Tips
                    </Box>
                  </Typography>
                  <List dense>
                    {selectedStyle.tips.map((tip, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <InfoIcon color="info" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedStyle(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default FarmingStyles;
