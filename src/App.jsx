import { useState } from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Categories from "./pages/categories";
import Home from "./pages/home";
import Search from "./pages/search";
import SingleGif from "./pages/single-gif";
import Fvrts from "./pages/fvrts";
import AppLayout from "./layout/app-layout";
import GifProvider from "./context/gif-context";

//home page
//categories
//search
//single gif
//fvrts

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Categories />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favorite",
        element: <Fvrts />,
      },
    ],
  },
]);
function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
