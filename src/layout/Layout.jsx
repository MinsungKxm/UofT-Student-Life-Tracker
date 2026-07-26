import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


function Layout() {

  return (<>
   <Header />
    <div className="layout">
      <SideBar />
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  </>)
}

export default Layout;
