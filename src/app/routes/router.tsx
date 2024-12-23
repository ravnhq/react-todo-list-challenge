import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "./app.routes";

export default function Router() {
  const router = createBrowserRouter(AppRoutes);

  return <RouterProvider router={router} />;
}
