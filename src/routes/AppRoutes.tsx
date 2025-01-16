import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import LearningCenter from '../pages/LearningCenter';
import LocalStores from '../pages/LocalStores';
import Community from '../pages/Community';
import PlantGuide from '../pages/PlantGuide';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learning" element={<LearningCenter />} />
        <Route path="stores" element={<LocalStores />} />
        <Route path="community" element={<Community />} />
        <Route path="guide" element={<PlantGuide />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
