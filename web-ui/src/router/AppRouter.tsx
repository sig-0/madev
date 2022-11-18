import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout/AppLayout';
import Homepage from '../components/pages/Homepage/Homepage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Homepage/>}/>
      <Route element={<AppLayout/>}>
        <Route path={'/placeholder'} element={<Homepage/>}/>
      </Route>
      <Route path="*" element={<Navigate to={'/'}/>}/>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
