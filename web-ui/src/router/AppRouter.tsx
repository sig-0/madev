import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout/AppLayout';
import AccountsPage from '../components/pages/AccountsPage/AccountsPage';
import SetupPage from '../components/pages/SetupPage/SetupPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/setup'} element={<SetupPage />} />
      <Route element={<AppLayout />}>
        <Route path={'/accounts'} element={<AccountsPage />} />
        <Route path={'/logs'} element={<AccountsPage />} />
        <Route path={'/contracts'} element={<AccountsPage />} />
        <Route path={'/blockscout'} element={<AccountsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/setup'} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
