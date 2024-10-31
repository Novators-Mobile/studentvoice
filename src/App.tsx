import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader";

const Login = lazy(() => import("./pages/Login"));
const Institutes = lazy(() => import("./pages/Institutes/Institutes"));
const Sidemenu = lazy(() => import("./components/Sidemenu"));
const Institute = lazy(() => import("./pages/Institute"));
const ItemInfo = lazy(() => import("./pages/ItemInfo"));
const EditDiscipline = lazy(() => import("./pages/EditDiscipline"));
const EditTeacher = lazy(() => import("./pages/EditTeacher"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Sidemenu />}>
            <Route index element={<Institutes />} />

            <Route path="institutes">
              <Route index element={<Institutes />} />

              <Route path=":instituteId">
                <Route index element={<Institute />} />

                <Route path="teacher/:teacherId">
                  <Route index element={<ItemInfo />} />
                  <Route path="edit" element={<EditTeacher />} />
                </Route>

                <Route path="discipline/:disciplineId">
                  <Route index element={<ItemInfo />} />
                  <Route path="edit" element={<EditDiscipline />} />
                </Route>

                <Route path="lesson/:lessonId" element={<div className="title">Какая-то пара...</div>} />
              </Route>
            </Route>

            <Route path="search" element={<div className="title">Поиск...</div>} />
            <Route path="new-profile" element={<EditTeacher />} />
            <Route path="new-discipline" element={<EditDiscipline />} />

            <Route path="*" element={<div>Страница не найдена <b>404</b></div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
