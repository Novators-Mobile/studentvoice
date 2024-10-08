import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Institutes from './pages/Institutes/Institutes';
import Sidemenu from './components/Sidemenu';
import Institute from './pages/Institute';
import ItemInfo from './pages/ItemInfo';
import EditDiscipline from './pages/EditDiscipline';
import EditTeacher from './pages/EditTeacher';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Sidemenu />} >
          <Route index element={<div>Главная страница</div>} />
          <Route path='/institutes' element={<Institutes />} />
          <Route path='/institutes/:instituteId' element={<Institute />} />
          <Route path='/institutes/:instituteId/teacher/:teacherId' element={<ItemInfo />} />
          <Route path='/institutes/:instituteId/discipline/:disciplineId' element={<ItemInfo />} />
          <Route path='/institutes/:instituteId/teacher/:teacherId/edit' element={<EditTeacher />} />
          <Route path='/institutes/:instituteId/discipline/:disciplineId/edit' element={<EditDiscipline />} />
        
          <Route path='/institutes/:instituteId/lesson/:lessonId' element={ <div className='title'>Какая-то пара...</div> } />
          <Route path='/search' element={ <div className='title'>Поиск...</div> } />

          <Route path='/new-profile' element={<EditTeacher />} />
          <Route path='/new-discipline' element={<EditDiscipline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}