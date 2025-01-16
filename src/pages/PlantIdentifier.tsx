import { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PlantIdentification {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  careInstructions: {
    water: string;
    sunlight: string;
    soil: string;
    temperature: string;
  };
  commonIssues: string[];
  image: string;
}

const mockIdentifyPlant = async (image: File): Promise<PlantIdentification> => {
  // This is a mock function. In production, this would call a real plant identification API
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
  
  return {
    name: "Tomato Plant",
    scientificName: "Solanum lycopersicum",
    confidence: 0.92,
    description: "The tomato plant is a popular vegetable crop known for its edible fruits. It's relatively easy to grow and can be cultivated in various settings.",
    careInstructions: {
      water: "Regular watering, keep soil moist but not waterlogged",
      sunlight: "Full sun, 6-8 hours daily",
      soil: "Well-draining, rich in organic matter",
      temperature: "65-85°F (18-29°C)"
    },
    commonIssues: [
      "Blossom end rot due to calcium deficiency",
      "Early blight causing leaf spots",
      "Fruit cracking from irregular watering"
    ],
    image: "/images/plants/tomato.jpg"
  };
};

const PlantIdentifier = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PlantIdentification | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const identification = await mockIdentifyPlant(selectedImage);
      setResult(identification);
    } catch (err) {
      setError('Failed to identify plant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Plant Identifier
      </Typography>
      <Typography variant="body1" paragraph>
        Take or upload a photo of any plant to identify it and get care instructions.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {previewUrl ? (
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <img
                  src={previewUrl}
                  alt="Selected plant"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    marginBottom: '16px',
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleIdentify}
                    disabled={loading}
                    sx={{ mr: 1 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Identify Plant'}
                  </Button>
                  <Button variant="outlined" onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <Button
                  variant="contained"
                  startIcon={<CameraAltIcon />}
                  onClick={handleCameraCapture}
                  sx={{ mr: 2 }}
                >
                  Take Photo
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PhotoLibraryIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Maximum file size: 5MB
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {result && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalFloristIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {result.name}
                  </Typography>
                </Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {result.scientificName}
                </Typography>
                <Chip
                  label={`${Math.round(result.confidence * 100)}% Match`}
                  color="success"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" paragraph>
                  {result.description}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Care Instructions
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <WaterDropIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Water"
                      secondary={result.careInstructions.water}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WbSunnyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sunlight"
                      secondary={result.careInstructions.sunlight}
                    />
                  </ListItem>
                </List>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Common Issues
                </Typography>
                <List dense>
                  {result.commonIssues.map((issue, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ErrorOutlineIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={issue} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlantIdentifier;
