import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home/Home.jsx";
import { api } from "./api.js";

import Layout from "./layout/Layout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Authenticate/Login.jsx";
import Register from "./pages/Authenticate/Register.jsx";
import GuidesHome from "./pages/Guides/GuidesHome.jsx";
import ASIP from "./pages/Guides/GuidePages/ASIP.jsx";
import ROP from "./pages/Guides/GuidePages/ROP.jsx";
import CampusJobs from "./pages/Guides/GuidePages/CampusJobs.jsx";
import WorkStudy from "./pages/Guides/GuidePages/WorkStudy.jsx";


function HomeRoute() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api.getSession()
      .then((session) => {
        setLoggedIn(session.loggedIn);
      })
      .catch(() => {
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<HomeRoute />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated pages */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guides" element={<GuidesHome />} />
          <Route path="/guides/asip" element={<ASIP />} />
          <Route path="/guides/campus-jobs" element={<CampusJobs />} />
          <Route path="/guides/rop" element={<ROP />} />
          <Route path="/guides/work-study" element={<WorkStudy />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;