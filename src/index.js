import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
/* import files from pages folder */
import Discover from "./pages/Discover";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Lists from "./pages/Lists";
import Favorites from "./pages/Favorites";
import Collections from "./pages/Collections";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Discover />
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'watchlist',
        element: <Watchlist />
      },
      {
        path: 'lists',
        element: <Lists />
      },
      {
        path: 'favorites',
        element: <Favorites />
      },
      {
        path: 'collections',
        element: <Collections />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
