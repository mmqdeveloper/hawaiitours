// PrivateRouter.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LayoutDefault from "../components/Layouts/Layout";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";
import UserManager from "../pages/UserManager";
import UserCreate from "../pages/UserManager/create";

const PrivateRouter = () => {
    const { loading, isLogin } = useSelector((state) => state.auth);
    if (!loading && !isLogin) {
      return <Navigate to="/auth/login" />;
    }
    return (
        <LayoutDefault>
            <Routes>
                <Route element={<UserManager />} path="users" />
                <Route element={<UserCreate />} path="users/create" />
                <Route element={<Dashboard />} index />
            </Routes>
        </LayoutDefault>
    );
};

export default PrivateRouter;
