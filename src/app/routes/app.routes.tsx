import { Navigate, RouteObject } from "react-router-dom";
import { Paths } from "./path.routes";
import DashboardLayout from "../../components/layouts/dashboard-layout/dashboard-layout";
import Todo from "../pages/todo/todo";
import CompletedTodo from "../pages/completed-todos/completed-todo";

export const AppRoutes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <DashboardLayout />,
    children: [
      {
        path: Paths.HOME,
        element: <Navigate to={Paths.TASKS} />,
      },
      {
        path: Paths.TASKS,
        element: <Todo />,
      },
      {
        path: Paths.COMPLETED_TASKS,
        element: <CompletedTodo />,
      },
    ],
  },
];
