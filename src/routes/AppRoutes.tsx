import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import LearningCenter from '../pages/LearningCenter';
import LocalStores from '../pages/LocalStores';
import Community from '../pages/Community';
import PlantGuide from '../pages/PlantGuide';
import Tutorials from '../pages/Tutorials';
import FarmingStyles from '../pages/FarmingStyles';
import PlantIdentifier from '../pages/PlantIdentifier';
import Events from '../pages/Events';
import Mentors from '../pages/Mentors';
import GrowingSeasons from '../pages/GrowingSeasons';
import SoilGuide from '../pages/SoilGuide';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<LearningCenter />} />
          <Route path="/stores" element={<LocalStores />} />
          <Route path="/community" element={<Community />} />
          <Route path="/plants" element={<PlantGuide />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/farming-styles" element={<FarmingStyles />} />
          <Route path="/plant-identifier" element={<PlantIdentifier />} />
          <Route path="/events" element={<Events />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/growing-seasons" element={<GrowingSeasons />} />
          <Route path="/soil-guide" element={<SoilGuide />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
