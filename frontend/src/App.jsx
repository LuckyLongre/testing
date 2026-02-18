
import React, { Suspense, lazy } from "react";
import { UserProvider } from './components/providers/UserProvider';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Project = lazy(() => import("./pages/Project"));
const Signup = lazy(() => import("./pages/Signup"));
const Layout = lazy(() => import("./layout/Layout"));
import { Toaster } from "sonner";
import { useUser } from "./components/providers/UserProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div />}> 
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: (
        <Suspense fallback={<div />}> <Home /> </Suspense>
      ) },
      { path: "login", element: (
        <Suspense fallback={<div />}> <Login /> </Suspense>
      ) },
      { path: "signup", element: (
        <Suspense fallback={<div />}> <Signup /> </Suspense>
      ) },
      { path: "dashboard", element: (
        <ProtectedRoute>
          <Suspense fallback={<div />}> <Dashboard /> </Suspense>
        </ProtectedRoute>
      ) },
      { path: "project/:id", element: (
        <Suspense fallback={<div />}> <Project /> </Suspense>
      ) },
    ]
  }
]);


function App() {
  return (
    <UserProvider>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;