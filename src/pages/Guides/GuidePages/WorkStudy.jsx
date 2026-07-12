import React from "react";
import "./GuidePage.css";

function WorkStudy() {
  return (
    <div className="guide-page">
      <main className="guide-content">

        {/* TITLE */}
        <h1 className="guide-title">Work Study Guide</h1>

        {/* META */}
        <p className="guide-meta">
          v1.0 - Last Updated July 2026
        </p>

        {/* AUTHOR */}
        <div className="guide-author">
          <p><strong>Written by:</strong> Minsung</p>
          <p>UofT Student Guide System</p>
          <p>Computer Science Track</p>
        </div>

        {/* SECTION 1 */}
        <h2 className="guide-section-heading">What is Work Study?</h2>
        <p>
          The UofT Work Study Program offers paid, on-campus jobs during the
          Summer and Fall/Winter terms. These positions allow students to gain
          professional or research experience while studying, helping them build
          transferable skills and explore career paths related to their academic
          interests.
        </p>

        {/* SECTION 2 */}
        <h2 className="guide-section-heading">Types of Positions</h2>
        <p>
          There are two Work Study streams:
        </p>

        <ul>
          <li>
            <strong>Work Experience Stream</strong> – General on-campus jobs
            supervised by university staff or faculty that focus on developing
            workplace skills.
          </li>
          <li>
            <strong>Research Experience Stream</strong> – Faculty-led research
            opportunities for students interested in gaining research experience.
          </li>
        </ul>

        {/* SECTION 3 */}
        <h2 className="guide-section-heading">Who is Eligible?</h2>
        <p>
          Most undergraduate and graduate UofT students are eligible if they
          meet the required course load. International students may also apply,
          provided they satisfy Canadian immigration regulations for on-campus
          work. Students may only hold <strong>one</strong> Work Study position
          during each program cycle.
        </p>

        {/* SECTION 4 */}
        <h2 className="guide-section-heading">How to Apply</h2>
        <ol>
          <li>Log into CLNx and browse available Work Study positions.</li>
          <li>Search using keywords related to your interests or career goals.</li>
          <li>Tailor your resume and (if requested) cover letter to each position.</li>
          <li>Submit your application before the posting deadline.</li>
          <li>If selected, attend an interview and complete hiring paperwork.</li>
        </ol>

        {/* SECTION 5 */}
        <h2 className="guide-section-heading">Application Tips</h2>
        <ul>
          <li>Apply early—some positions close before the official deadline.</li>
          <li>Customize your resume for every application.</li>
          <li>Prepare interview examples that demonstrate your skills.</li>
          <li>Use CLNx career services for resume reviews and mock interviews.</li>
        </ul>

        {/* SECTION 6 */}
        <h2 className="guide-section-heading">Pay & Program Length</h2>
        <p>
          As of October 1, 2026, Work Study positions pay
          <strong> $17.95/hour</strong>. The program runs during the Summer and
          Fall/Winter terms, with application periods opening several months
          before each work term begins.
        </p>

        {/* KEY TAKEAWAYS */}
        <div className="guide-note">
          <p>✔ Paid on-campus employment with flexible student-friendly hours.</p>
          <p>✔ Gain professional or research experience while studying.</p>
          <p>✔ Open to both domestic and international students (eligibility applies).</p>
          <p>✔ Only one Work Study position may be accepted per program cycle.</p>
          <p>✔ Applications are submitted through CLNx.</p>
        </div>

      </main>
    </div>
  );
}

export default WorkStudy;