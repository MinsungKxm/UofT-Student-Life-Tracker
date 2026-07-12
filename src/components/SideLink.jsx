import React from "react";

function SideLink({ text, activeLink, setActiveLink }) {
  const id = text.toLowerCase().replace(/\s/g, "");

  return (
    <a
      href={`#${id}`}
      className={`side-link ${activeLink === id ? "active" : ""}`}
      onClick={() => setActiveLink(id)}
    >
      {text}
    </a>
  );
}

export default SideLink;