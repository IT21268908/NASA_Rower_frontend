import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import RowerPage from "./pages/RowerPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path={"/auth"} element={<Auth />} />
        <Route index path={"/rower"} element={<RowerPage />} />
      </Route>

      <Route path="*" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;
