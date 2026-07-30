import React from "react";
import SideLink from "./SideLink";
import SideSection from "./SideSection";

const RESOURCES = [
  { name: "ACORN", url: "https://acorn.utoronto.ca/" },
  { name: "Quercus", url: "https://q.utoronto.ca/" },
  { name: "Crowdmark", url: "https://crowdmark.com/" },
  { name: "MarkUs", url: "https://markus-ds.teach.cs.toronto.edu/" },
  { name: "Folio", url: "https://folio.utoronto.ca/" },
  { name: "CLNx", url: "https://clnx.utoronto.ca/" },
];


function SideBar() {
  return (
    <nav className="sidebar">
      <SideLink text="Dashboard" to="/" />
      <SideSection title="RESOURCES" titleClass="resources-title" >
        {RESOURCES.map((r) => (
          <a
            key={r.name}
            className="side-link"
            href={r.url}
            target="_blank"
            rel="noreferrer"
          >
            {r.name}
          </a>
        ))}
        <SideLink text="Guides" to="/guides" />

      </SideSection>
      <SideSection title="PLANNING" titleClass="planning-title">
        <SideLink text="Calendar" to="/dashboard" />
        <SideLink text="Deadlines" to="/dashboard" />
      </SideSection>
      <SideSection title="WELLNESS" titleClass="wellness-title" >
        <SideLink text="Fitness Tracker" to="/dashboard" />
      </SideSection>
    </nav>
  );
}

export default SideBar;