import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Authenticate/Login.jsx";
import Register from "./pages/Authenticate/Register.jsx";
import GuidesHome from "./pages/Guides/GuidesHome.jsx";
import ASIP from "./pages/Guides/GuidePages/ASIP.jsx";
import ROP from "./pages/Guides/GuidePages/ROP.jsx";
import CampusJobs from "./pages/Guides/GuidePages/CampusJobs.jsx";
import WorkStudy from "./pages/Guides/GuidePages/WorkStudy.jsx";

function App() {
  return (
    <BrowserRouter>

    <Routes>
      {/* Pages without sidebar/header */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pages with sidebar/header */}
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