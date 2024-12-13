import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader";
import ScrollToTop from "./utils/ScrollToTop";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";

const Login = lazy(() => import("./pages/Login"));
const EditLesson = lazy(() => import("./pages/EditLesson"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SurveyForm = lazy(() => import("./pages/SurveyForm"));
const Institutes = lazy(() => import("./pages/admin/Institutes"));
const Sidemenu = lazy(() => import("./components/Sidemenu"));
const Institute = lazy(() => import("./pages/admin/Institute"));
const ItemInfo = lazy(() => import("./pages/admin/ItemInfo"));
const EditDiscipline = lazy(() => import("./pages/admin/EditDiscipline"));
const EditTeacher = lazy(() => import("./pages/admin/EditTeacher"));
const SearchPage = lazy(() => import("./pages/admin/SearchPage"));
const LessonInfo = lazy(() => import("./pages/admin/LessonInfo"));
const QR = lazy(() => import("./pages/admin/QR"));
const Statistics = lazy(() => import("./pages/admin/Statistics"));
const Profile = lazy(() => import("./pages/teacher/Profile"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <ToastContainer />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/:formId/viewform" element={<SurveyForm />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/" element={<Sidemenu />}>
              <Route index element={<Institutes />} />
              <Route path="institutes">
                <Route index element={<Institutes />} />
                <Route path=":instituteId">
                  <Route index element={<Institute />} />
                  <Route path="teacher/:teacherId">
                    <Route index element={<ItemInfo />} />
                    <Route path="edit" element={<EditTeacher />} />
                    <Route path="new-lesson" element={<EditLesson />} />
                  </Route>

                  <Route path="discipline/:disciplineId">
                    <Route index element={<ItemInfo />} />
                    <Route path="edit" element={<EditDiscipline />} />
                    <Route path="new-lesson" element={<EditLesson />} />
                  </Route>

                  <Route path="lesson/:lessonId">
                    <Route index element={<LessonInfo />} />
                    <Route path="edit" element={<EditLesson />} />
                    <Route path="qr" element={<QR />} />
                  </Route>
                </Route>
              </Route>

              <Route path="search" element={<SearchPage />} />
              <Route path="new-profile" element={<EditTeacher />} />
              <Route path="new-discipline" element={<EditDiscipline />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>
          </Route>

          <Route path="/" element={<PrivateRoute requiredRole="teacher" />}>
            <Route path="/" element={<Sidemenu />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="new-lesson" element={<EditLesson />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
