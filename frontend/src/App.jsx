import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import Signup from "./pages/login&signup/Signup";
import Login from "./pages/login&signup/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/register-account" element={<Signup />}></Route>
      <Route path="/login-account" element={<Login />}></Route>

      {/* ginagawa niyang default page yung login page */}
      {/* <Route path="/" element={<Navigate to="/login-account" />} /> */}

      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/mdrrmc/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/detail/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
