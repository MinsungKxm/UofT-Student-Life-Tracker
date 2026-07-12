import React from "react";
import "./GuidePage.css";

function ROP() {
  const noteParagraphs = [
    "This guide explains the ROP program in detail.",
    "It is designed for students looking for internship-style experience.",
  ];

  return (
    <div className="guide-page">
      <main className="guide-content">

        {/* TITLE */}
        <h1 className="guide-title">ROP Guide</h1>

        {/* META */}
        <p className="guide-meta">
          v1.0 - Last Edit July 2026
        </p>

        {/* AUTHOR */}
        <div className="guide-author">
          <p>Written by: Minsung</p>
          <p>UofT Student Guide System</p>
          <p>Computer Science Track</p>
        </div>

        {/* SECTION 1 */}
        <h2 className="guide-section-heading">What is ROP?</h2>
        <p>
          ROP (Research Opportunity Program) is a second or third-year course where students can join an instructor's research project while earning 0.5 to 1.0 credit. It takes place during your academic year. You can take up to two maximum ROP courses. 
        </p>

        {/* SECTION 2 */}
        <h2 className="guide-section-heading">Who is it for?</h2>
        <p>
          All students are eligible to apply for ROP if they are a full-time or part-time student of an undergraduate program offered by the Faculty of Arts & Science. They must also have accumulated 4.0 - 13.5 credits (including transfer credits) by the end of the April exam period.
        </p>

        {/* SECTION 3 */}
        <h2 className="guide-section-heading">When do I apply?</h2>
        <p>
          The application window for ROPs is within your current academic year (before you start taking the ROP next year), typically from February to March. For more information, please visit the Arts & Science web page detailing on ROPs.<a href="https://www.artsci.utoronto.ca/current/experiential-learning/research-opportunities/research-opportunities-program">ROP</a>
        </p>

      

        {/* BULLET / NOTES */}
        <div className="guide-note">
          <p>✔ Competitive application process</p>
          <p>✔ Requires resume + cover letter</p>
          <p>✔ Includes work terms with employers</p>
        </div>

      </main>
    </div>
  );
}

export default ROP;