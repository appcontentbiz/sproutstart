import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Tooltip,
  Avatar,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SchoolIcon from '@mui/icons-material/School';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EventIcon from '@mui/icons-material/Event';
import LandscapeIcon from '@mui/icons-material/Landscape';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useNavigate } from 'react-router-dom';

const mainPages = [
  { title: 'Learning Center', path: '/learning', icon: <SchoolIcon /> },
  { title: 'Local Stores', path: '/stores', icon: <StoreIcon /> },
  { title: 'Community', path: '/community', icon: <PeopleIcon /> },
  { title: 'Plant Guide', path: '/plants', icon: <LocalFloristIcon /> },
];

const learningPages = [
  { title: 'Tutorials', path: '/tutorials', icon: <SchoolIcon /> },
  { title: 'Farming Styles', path: '/farming-styles', icon: <LandscapeIcon /> },
  { title: 'Growing Seasons', path: '/growing-seasons', icon: <WbSunnyIcon /> },
  { title: 'Soil Guide', path: '/soil-guide', icon: <LandscapeIcon /> },
];

const communityPages = [
  { title: 'Events', path: '/events', icon: <EventIcon /> },
  { title: 'Mentors', path: '/mentors', icon: <PeopleIcon /> },
];

const toolPages = [
  { title: 'Plant Identifier', path: '/plant-identifier', icon: <CameraAltIcon /> },
];

const Navigation = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElLearn, setAnchorElLearn] = useState<null | HTMLElement>(null);
  const [anchorElCommunity, setAnchorElCommunity] = useState<null | HTMLElement>(null);
  const [anchorElTools, setAnchorElTools] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenLearnMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLearn(event.currentTarget);
  };

  const handleOpenCommunityMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCommunity(event.currentTarget);
  };

  const handleOpenToolsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTools(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseLearnMenu = () => {
    setAnchorElLearn(null);
  };

  const handleCloseCommunityMenu = () => {
    setAnchorElCommunity(null);
  };

  const handleCloseToolsMenu = () => {
    setAnchorElTools(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
    handleCloseLearnMenu();
    handleCloseCommunityMenu();
    handleCloseToolsMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalFloristIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            SproutStart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mainPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              <Divider />
              {learningPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              <Divider />
              {communityPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              <Divider />
              {toolPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LocalFloristIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            SproutStart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* Learning Dropdown */}
            <Button
              onClick={handleOpenLearnMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Learn
            </Button>
            <Menu
              anchorEl={anchorElLearn}
              open={Boolean(anchorElLearn)}
              onClose={handleCloseLearnMenu}
            >
              {learningPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Community Dropdown */}
            <Button
              onClick={handleOpenCommunityMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Community
            </Button>
            <Menu
              anchorEl={anchorElCommunity}
              open={Boolean(anchorElCommunity)}
              onClose={handleCloseCommunityMenu}
            >
              {communityPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Tools Dropdown */}
            <Button
              onClick={handleOpenToolsMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Tools
            </Button>
            <Menu
              anchorEl={anchorElTools}
              open={Boolean(anchorElTools)}
              onClose={handleCloseToolsMenu}
            >
              {toolPages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Regular Menu Items */}
            {mainPages.map((page) => (
              <Button
                key={page.path}
                onClick={() => handleNavigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
