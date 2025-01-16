import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';

interface Plant {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  waterNeeds: 'Low' | 'Medium' | 'High';
  sunlight: 'Full Sun' | 'Partial Sun' | 'Shade';
  temperature: string;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Year-round';
  growthTime: string;
  companions: string[];
  tips: string[];
}

const plantDatabase: Plant[] = [
  {
    id: 1,
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    description: 'A popular garden vegetable perfect for beginners. Produces fruit throughout the season.',
    image: '/images/plants/tomato.jpg',
    difficulty: 'Beginner',
    waterNeeds: 'Medium',
    sunlight: 'Full Sun',
    temperature: '65-85°F',
    season: 'Summer',
    growthTime: '60-80 days',
    companions: ['Basil', 'Marigold', 'Carrots'],
    tips: [
      'Plant deeply to develop strong roots',
      'Provide support with cages or stakes',
      'Remove suckers for better growth'
    ]
  },
  // Add more plants here
];

const PlantGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleSeasonToggle = (season: string) => {
    setSelectedSeason(prev =>
      prev.includes(season)
        ? prev.filter(s => s !== season)
        : [...prev, season]
    );
  };

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(plant.difficulty);
    const matchesSeason = selectedSeason.length === 0 || selectedSeason.includes(plant.season);
    return matchesSearch && matchesDifficulty && matchesSeason;
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Plant Guide
      </Typography>
      
      {/* Search and Filter Bar */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <IconButton onClick={() => setOpenFilters(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Filter Dialog */}
      <Dialog open={openFilters} onClose={() => setOpenFilters(false)}>
        <DialogTitle>Filter Plants</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>Difficulty</Typography>
          <Box sx={{ mb: 2 }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
              <Chip
                key={difficulty}
                label={difficulty}
                onClick={() => handleDifficultyToggle(difficulty)}
                color={selectedDifficulty.includes(difficulty) ? 'primary' : 'default'}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
          <Typography variant="subtitle1" gutterBottom>Season</Typography>
          <Box>
            {['Spring', 'Summer', 'Fall', 'Winter', 'Year-round'].map(season => (
              <Chip
                key={season}
                label={season}
                onClick={() => handleSeasonToggle(season)}
                color={selectedSeason.includes(season) ? 'primary' : 'default'}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFilters(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Plant Grid */}
      <Grid container spacing={3}>
        {filteredPlants.map(plant => (
          <Grid item key={plant.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => setSelectedPlant(plant)}
            >
              <CardMedia
                component="img"
                height="200"
                image={plant.image}
                alt={plant.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {plant.scientificName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    label={plant.difficulty}
                    color={
                      plant.difficulty === 'Beginner' ? 'success' :
                      plant.difficulty === 'Intermediate' ? 'warning' : 'error'
                    }
                  />
                  <Chip size="small" label={plant.season} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Plant Detail Dialog */}
      <Dialog
        open={Boolean(selectedPlant)}
        onClose={() => setSelectedPlant(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedPlant && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedPlant.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedPlant.scientificName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Overview" />
                  <Tab label="Growing Guide" />
                  <Tab label="Tips" />
                </Tabs>
              </Box>

              {/* Overview Tab */}
              {tabValue === 0 && (
                <Box>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedPlant.image}
                    alt={selectedPlant.name}
                    sx={{ borderRadius: 1, mb: 2 }}
                  />
                  <Typography variant="body1" paragraph>
                    {selectedPlant.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WaterDropIcon color="primary" />
                        <Typography variant="body2">Water Needs</Typography>
                        <Typography variant="subtitle2">{selectedPlant.waterNeeds}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WbSunnyIcon color="primary" />
                        <Typography variant="body2">Sunlight</Typography>
                        <Typography variant="subtitle2">{selectedPlant.sunlight}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <ThermostatIcon color="primary" />
                        <Typography variant="body2">Temperature</Typography>
                        <Typography variant="subtitle2">{selectedPlant.temperature}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Growth Time</Typography>
                        <Typography variant="subtitle2">{selectedPlant.growthTime}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Growing Guide Tab */}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Companion Plants
                  </Typography>
                  <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedPlant.companions.map(companion => (
                      <Chip key={companion} label={companion} />
                    ))}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Seasonal Care
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Best planted in {selectedPlant.season}
                  </Typography>
                  <Typography variant="body1">
                    Takes approximately {selectedPlant.growthTime} to mature
                  </Typography>
                </Box>
              )}

              {/* Tips Tab */}
              {tabValue === 2 && (
                <Box>
                  {selectedPlant.tips.map((tip, index) => (
                    <Typography key={index} paragraph>
                      • {tip}
                    </Typography>
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedPlant(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default PlantGuide;
