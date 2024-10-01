import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Institutes from './pages/Institutes/Institutes';
import Sidemenu from './components/Sidemenu';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Sidemenu />} >
          <Route index element={<div>Главная страница</div>} />
          <Route path='/institutes' element={<Institutes />} />
          <Route path='/institutes/:instituteId' element={<div>Институт</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}