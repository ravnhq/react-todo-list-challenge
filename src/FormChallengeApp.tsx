import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomeTodoPage } from "./pages/HomeTodoPage/HomeTodoPage";
import { NewTodoPage } from "./pages/NewTodoPage/NewTodoPage";
import { FormChallengeLayout } from "./layout/FormChallengeLayout.tsx";
import { CalendarTodoPage } from "./pages/CalendarTodoPage/CalendarTodoPage.tsx";

export const FormChallengeApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<FormChallengeLayout />}>
          <Route index element={<HomeTodoPage />} />
          <Route path="new" element={<NewTodoPage />} />
          <Route path="calendar" element={<CalendarTodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
