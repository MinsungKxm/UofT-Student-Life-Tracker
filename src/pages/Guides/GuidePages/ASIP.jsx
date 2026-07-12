import React from "react";
import "./GuidePage.css";

function ASIP() {
  const noteParagraphs = [
    "This guide explains the ASIP program in detail.",
    "It is designed for students looking for internship-style experience.",
  ];

  return (
    <div className="guide-page">
      <main className="guide-content">

        {/* TITLE */}
        <h1 className="guide-title">ASIP Guide</h1>

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
        <h2 className="guide-section-heading">What is ASIP?</h2>
        <p>
          ASIP (Arts & Science Internship Program) is an opportunity for undergraduate students to experience 12-20 month of paid work experience with professional training. Students are typially admitted in their second or third year. For more information, please visit this site:   
          <a href="https://www.artsci.utoronto.ca/current/experiential-learning/internships/asip/how-does-asip-work">ASIP</a>        

        </p>
        {/* SECTION 2 */}
        <h2 className="guide-section-heading">Who is it for?</h2>
        <p>
          Eligible students are incoming second year or third year students.
          It is intended for students in Arts & Science programs who want internship experience
          during their degree. There is also a chance that you get a return offer (once you complete your studies, you can work in the company you previously worked for as an intern, but now as a full-time employee), so if you believe an internship can greatly help your chances of getting a job in your field (notably, CS), at least applying for ASIP is highly recommended. 
        </p>
        {/* SECTION 3 */}
        <h2 className="guide-section-heading">How does it work?</h2>
        <p>
          Before you begin your work, you must take four professional development courses. These span out during your academic year. For example, if I were previously a first year student, and applied and accepted ASIP in 2026 Fall, I would have to take four courses during my second year, then begin my work after my second year ends.
        </p>
        {/* SECTION 4 */}
        <h2 className="guide-section-heading">Sidenotes</h2>
        <ul>
          <li>You are NOT guaranteed a work experience. Many jobs provided for ASIP are still highly competed by your peers, so unless you are willing to show a good academic standing, do not blindly apply thinking you will gain work experience.</li>
          <li>ASIP is not free. The program's fees ranges from $2000~3000. </li>
          <li>ASIP is highly competitive</li>
        </ul>

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

export default ASIP;


