import React from 'react';
import { RouterProvider } from "react-router-dom";
import {route} from "./app.route";
import {API} from "../config/config.js";

const App = () => {
  return (
      <RouterProvider router={route} />
  )
}

export default App;
