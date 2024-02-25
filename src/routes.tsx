import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, Layout, User, Commit, Repository } from "./pages/index";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedLoggedRoute from "./components/protectedLoggedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/user", element: <ProtectedRoute element={<User />} /> },
      {
        path: "/repository/",
        element: <ProtectedRoute element={<Repository />} />,
      },
      {
        path: "/commit/:name/:repoName",
        element: <ProtectedRoute element={<Commit />} />,
      },
      { path: "*", element: <Navigate to="/login" /> },
      { path: "/", element: <Navigate to="/login" /> },
      { path: "login", element: <ProtectedLoggedRoute element={<Login />} /> },
    ],
  },
]);
export default router;
