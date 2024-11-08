import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader";
import ScrollToTop from "./utils/ScrollToTop";
import EditLesson from "./pages/EditLesson";
import NotFound from "./pages/NotFound";
import SurveyForm from "./pages/SurveyForm";

const Login = lazy(() => import("./pages/Login"));
const Institutes = lazy(() => import("./pages/Institutes/Institutes"));
const Sidemenu = lazy(() => import("./components/Sidemenu"));
const Institute = lazy(() => import("./pages/Institute"));
const ItemInfo = lazy(() => import("./pages/ItemInfo"));
const EditDiscipline = lazy(() => import("./pages/EditDiscipline"));
const EditTeacher = lazy(() => import("./pages/EditTeacher"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LessonInfo = lazy(() => import("./pages/LessonInfo"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ScrollToTop />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/:formId/viewform" element={<SurveyForm />} />

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

                <Route path="lesson/:lessonId">
                  <Route index element={<LessonInfo />} />
                  <Route path="edit" element={<EditLesson />} />
                </Route>
              </Route>
            </Route>

            <Route path="search" element={<SearchPage />} />
            <Route path="new-profile" element={<EditTeacher />} />
            <Route path="new-discipline" element={<EditDiscipline />} />
            <Route path="new-lesson" element={<EditLesson />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
