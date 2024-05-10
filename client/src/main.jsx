import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import "./index.css";
import React from "react";

import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
//import SingleThought from './pages/SingleThought';
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import SubscriptionExpired from "./pages/SubscriptionExpired";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/profiles/:profileId",
        element: <Profile />,
      },
    ],
  },
]);

const isTrail = true; 

if (!isTrail) {
  router.error = <SubscriptionExpired />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
