import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Institutes from './pages/Institutes/Institutes';
import Sidemenu from './components/Sidemenu';
import Institute from './pages/Institutes/Institute';
import Teacher from './pages/Teacher/Teacher';
import Discipline from './pages/Discipline/Discipline';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Sidemenu />} >
          <Route index element={<div>Главная страница</div>} />
          <Route path='/institutes' element={<Institutes />} />
          <Route path='/institutes/:instituteId' element={<Institute />} />
          <Route path='/institutes/:instituteId/teacher/:itemId' element={<Teacher />} />
          <Route path='/institutes/:instituteId/discipline/:itemId' element={<Discipline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}