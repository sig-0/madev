import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout/AppLayout';
import Homepage from '../components/pages/Homepage/Homepage';
import SetupPage from '../components/pages/SetupPage/SetupPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/setup'} element={<SetupPage />} />
      <Route element={<AppLayout />}>
        <Route path={'/accounts'} element={<Homepage />} />
        <Route path={'/logs'} element={<Homepage />} />
        <Route path={'/contracts'} element={<Homepage />} />
        <Route path={'/blockscout'} element={<Homepage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/setup'} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
