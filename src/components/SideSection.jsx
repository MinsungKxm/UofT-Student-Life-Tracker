import React from "react";
import SideLink from "./SideLink.jsx";

function SideSection({ title, titleClass = "", children }) {
  return (
    <div className="side-section">
      <div className={`side-section-title ${titleClass}`}>
        {title}
      </div>
      <div className="side-links">
        {children}
      </div>
    </div>
  );
}

export default SideSection;