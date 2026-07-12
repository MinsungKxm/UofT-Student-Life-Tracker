import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login/Login.jsx";
import GuidesHome from "./pages/Guides/GuidesHome.jsx";
import ASIP from "./pages/Guides/GuidePages/ASIP.jsx";
import CampusJobs from "./pages/Guides/GuidePages/CampusJobs.jsx";
import ROP from "./pages/Guides/GuidePages/CampusJobs.jsx";
import WorkStudy from "./pages/Guides/GuidePages/WorkStudy.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/guides" element={<GuidesHome/>}/>
        <Route path="/guides/asip" element={<ASIP/>}/>
        <Route path="/guides/campus-jobs" element={<CampusJobs/>} />
        <Route path="/guides/rop" element={<ROP/>}/>
        <Route path="/guides/work-study" element={<WorkStudy/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);