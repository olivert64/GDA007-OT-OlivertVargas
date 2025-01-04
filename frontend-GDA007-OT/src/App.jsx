import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

import CustomAppBar from "./components/CustomAppBar";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomAppBar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
