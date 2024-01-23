import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutDefault from "../components/Layouts/Layout";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";
import LoginPage from "../components/LoginPage";

const PublicRouter = () => {
    const {user, loading, isLogin} = useSelector((state) => state.auth);
    if (!loading && isLogin) {
      return <Navigate to="/" />;
    }
    return (
      <Routes>
          <Route element={<LoginPage />} path="login"/>
      </Routes>
    );
  };

export default PublicRouter;
