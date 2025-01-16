import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  IconButton,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface Store {
  id: string;
  name: string;
  type: 'garden_center' | 'farm_supply' | 'nursery' | 'equipment';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  rating: number;
  reviews: number;
  hours: {
    [key: string]: string;
  };
  products: string[];
  services: string[];
  images: string[];
  description: string;
  website: string;
  delivery: boolean;
  distance?: number;
  isSaved?: boolean;
}

const mockStores: Store[] = [
  {
    id: '1',
    name: "Green Thumb Garden Center",
    type: 'garden_center',
    address: "123 Plant Street, Greenville, CA 95123",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    phone: "(555) 123-4567",
    rating: 4.7,
    reviews: 128,
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 5:00 PM',
      'Sunday': '10:00 AM - 4:00 PM'
    },
    products: [
      'Seeds',
      'Plants',
      'Soil & Fertilizers',
      'Tools',
      'Irrigation Supplies'
    ],
    services: [
      'Plant Care Advice',
      'Soil Testing',
      'Tool Rental',
      'Delivery'
    ],
    images: [
      '/images/stores/green-thumb-1.jpg',
      '/images/stores/green-thumb-2.jpg'
    ],
    description: "Your one-stop shop for all gardening needs. We offer a wide selection of plants, tools, and expert advice to help your garden thrive.",
    website: "www.greenthumbgarden.com",
    delivery: true
  },
  // Add more mock stores
];

const StoreLocator = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize map when component mounts
    // This would use a mapping service like Google Maps or Mapbox
    const initMap = async () => {
      // Implementation would go here
      console.log('Map initialized');
    };

    if (mapRef.current) {
      initMap();
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setOpenDialog(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSaveStore = (storeId: string) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { ...store, isSaved: !store.isSaved }
        : store
    ));
  };

  const handleGetDirections = (address: string) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Local Farm & Garden Stores
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find gardening supplies, equipment, and expert advice near you
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search stores or products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            <Tab label="All" />
            <Tab label="Garden Centers" />
            <Tab label="Farm Supply" />
            <Tab label="Nurseries" />
            <Tab label="Equipment" />
          </Tabs>

          <List sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
            {stores.map((store) => (
              <Card key={store.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6">
                        {store.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={store.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({store.reviews})
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleSaveStore(store.id)}
                    >
                      {store.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1, fontSize: 'small' }} />
                    <Typography variant="body2" color="text.secondary">
                      {store.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 'small' }} />
                    <Typography variant="body2" color="text.secondary">
                      {store.phone}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    {store.products.slice(0, 3).map((product, index) => (
                      <Chip
                        key={index}
                        label={product}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                    {store.products.length > 3 && (
                      <Chip
                        label={`+${store.products.length - 3} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DirectionsIcon />}
                      onClick={() => handleGetDirections(store.address)}
                    >
                      Directions
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleStoreClick(store)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            ref={mapRef}
            sx={{
              height: 'calc(100vh - 200px)',
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
            }}
          >
            {/* Map will be rendered here */}
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedStore && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">
                  {selectedStore.name}
                </Typography>
                <Box>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleSaveStore(selectedStore.id)}
                  >
                    {selectedStore.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedStore.images[0]}
                    alt={selectedStore.name}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    {selectedStore.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Contact Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedStore.address} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedStore.phone} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedStore.website} />
                      </ListItem>
                    </List>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Store Hours
                  </Typography>
                  <List dense>
                    {Object.entries(selectedStore.hours).map(([day, hours]) => (
                      <ListItem key={day}>
                        <ListItemIcon>
                          <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${day}: ${hours}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Products & Services
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Available Products
                      </Typography>
                      <List dense>
                        {selectedStore.products.map((product, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <ShoppingBasketIcon />
                            </ListItemIcon>
                            <ListItemText primary={product} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Services
                      </Typography>
                      <List dense>
                        {selectedStore.services.map((service, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText primary={service} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<DirectionsIcon />}
                onClick={() => handleGetDirections(selectedStore.address)}
              >
                Get Directions
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default StoreLocator;
