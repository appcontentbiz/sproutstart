import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PlantGuide from '../pages/PlantGuide';
import FarmingStyles from '../pages/FarmingStyles';
import PlantIdentifier from '../pages/PlantIdentifier';
import Tutorials from '../pages/Tutorials';
import StoreLocator from '../pages/LocalStores/StoreLocator';
import Events from '../pages/Community/Events';
import Mentors from '../pages/Community/Mentors';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plant-guide" element={<PlantGuide />} />
      <Route path="/farming-styles" element={<FarmingStyles />} />
      <Route path="/plant-identifier" element={<PlantIdentifier />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/store-locator" element={<StoreLocator />} />
      <Route path="/events" element={<Events />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
