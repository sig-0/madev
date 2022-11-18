import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout/AppLayout';
import AccountsPage from '../components/pages/AccountsPage/AccountsPage';
import Blockscout from '../components/pages/Blockscout/Blockscout';
import SetupPage from '../components/pages/SetupPage/SetupPage';
import Logs from "../components/pages/Logger/Logs";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/setup'} element={<SetupPage />} />
      <Route element={<AppLayout />}>
        <Route path={'/accounts'} element={<AccountsPage />} />
        <Route path={'/logs'} element={<Logs />} />
        <Route path={'/contracts'} element={<AccountsPage />} />
        <Route path={'/blockscout'} element={<Blockscout />} />
      </Route>
      <Route path="*" element={<Navigate to={'/setup'} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
