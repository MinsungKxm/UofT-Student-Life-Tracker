import React from "react";
import "./GuidePage.css";

function CampusJobs() {
  const noteParagraphs = [
    "This guide explains how to apply for on-campus jobs.",
  ];

  return (
    <div className="guide-page">
      <main className="guide-content">

        {/* TITLE */}
        <h1 className="guide-title">Campus Job Guide</h1>

        {/* META */}
        <p className="guide-meta">
          v1.0 - Last Edit July 2026
        </p>

        {/* AUTHOR */}
        <div className="guide-author">
          <p>Written by: Minsung Kim</p>
          <p>UofT Student Guide System</p>
          <p>Computer Science Track</p>
        </div>

        {/* SECTION 1 */}
        <h2 className="guide-section-heading">What kinds of Campus jobs are there?</h2>
        <p>
          There are several different kinds of jobs provided by the campus. These are usually part time jobs meant for students to apply during their summer break. They can range from ambassadors, front desk assistants for residences, librarians, and more. 
        </p>

        {/* SECTION 2 */}
        <h2 className="guide-section-heading">Where do I apply?</h2>
        <p>
          All campus-related jobs are posted on <a href="clnx.utoronto.ca">CLNX. Click 'Jobs & Recruitment' on the left sidebar, click On-Campus Jobs, then click Search to get access to all job postings.</a>
        </p>

        {/* BULLET / NOTES */}
        <div className="guide-note">
          <p>Competitve resume + cover letter</p>
          <p>✔ Competitive application process</p>
          <p>✔ Requires resume + cover letter</p>
          <p>✔ Includes work terms with employers</p>
        </div>

      </main>
    </div>
  );
}

export default CampusJobs;