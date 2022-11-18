import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout/AppLayout';
import AccountsPage from '../components/pages/AccountsPage/AccountsPage';
import Blockscout from '../components/pages/Blockscout/Blockscout';
import ContractsPage from '../components/pages/ContractsPage/ContractsPage';
import ContractView from '../components/pages/ContractView/ContractView';
import Logs from '../components/pages/Logger/Logs';
import NewContract from '../components/pages/NewContract/NewContract';
import SetupPage from '../components/pages/SetupPage/SetupPage';
import Quit from '../components/pages/QuitPage/Quit';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/setup'} element={<SetupPage />} />
      <Route element={<AppLayout />}>
        <Route path={'/accounts'} element={<AccountsPage />} />
        <Route path={'/logs'} element={<Logs />} />
        <Route path={'/contracts'} element={<ContractsPage />} />
        <Route path={'/contracts/new'} element={<NewContract />} />
        <Route
          path={'/contracts/view/:contractAddress'}
          element={<ContractView />}
        />
        <Route path={'/blockscout'} element={<Blockscout />} />
        <Route path={'/quit'} element={<Quit />} />
      </Route>
      <Route path="*" element={<Navigate to={'/setup'} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
