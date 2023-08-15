import React, { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./sass/main.scss";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import { AuthContext } from "./context/authContext";
import Error from "./pages/errorPage/errorPage";

function App() {
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const rooter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </>
    )
  );

  return <RouterProvider router={rooter} />;
}

export default App;
