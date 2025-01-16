import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LearningCenter from '../pages/LearningCenter';
import LocalStores from '../pages/LocalStores';
import Community from '../pages/Community';
import PlantGuide from '../pages/PlantGuide';
import Layout from '../components/Layout/Layout';

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
