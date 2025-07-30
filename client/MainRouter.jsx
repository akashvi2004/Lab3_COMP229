import React from "react";
import { Route, Routes } from "react-router-dom";

// Core Pages
import Home from "./core/Home";
import Menu from "./core/Menu";

//  User Pages
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import EditProfile from "./user/EditProfile.jsx";

//  Dashboard
import Dashboard from "./core/Dashboard.jsx";

// Education Pages
import EducationList from "./core/EducationList.jsx";
import AddEducation from "./core/AddEducation.jsx";

// Project Pages
import ProjectList from "./core/ProjectList.jsx";
import AddProject from "./core/AddProject.jsx";

// PrivateRoute
import PrivateRoute from "./lib/PrivateRoute.jsx";

// Project Form
import ProjectForm from "./core/ProjectForm.jsx";


export default function MainRouter() {
  return (
    <div>
      {/* Navbar */}
      <Menu />

      {/*  App Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Profile */}
        <Route path="/user/:userId" element={<Profile />} />

        {/* Education (viewable by everyone) */}
        <Route path="/education" element={<EducationList />} />

        {/* Projects (viewable by everyone) */}
        <Route path="/projects" element={<ProjectList />} />

        {/* Private Routes */}
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

            <Route
      path="/projects/new"
      element={
        <PrivateRoute>
          <ProjectForm />
        </PrivateRoute>
      }
    />


        {/*Admin-only Add Routes (but wrapped in PrivateRoute) */}
        <Route
          path="/education/add"
          element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/add"
          element={
            <PrivateRoute>
              <AddProject />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
