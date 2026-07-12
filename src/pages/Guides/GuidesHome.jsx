import React from "react";
import "./GuidesHome.css";
import GuideSection from "../../components/GuideSection.jsx";

function GuidesHome() {
  return (
    <div className="guides-page">
      <header className="site-header">
        <div className="logo">YOUR LOGO</div>

        <nav className="main-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Community</a>
          <a href="#">Resources</a>
          <a href="#">Posts</a>
        </nav>
      </header>

      <main className="guides-home">
        <h1 className="page-title">Guides</h1>
        <GuideSection title="ASIP Guide" link="/guides/asip-guide" linkTitle="Placeholder Link Title" desc="Replace with your own note" />
        <GuideSection title="Campus Jobs Guide" link="/guides/campus-jobs-guide" linkTitle="Placeholder Link Title" desc="Replace with your own note" />
        <GuideSection title="ROP Guide" link="/guides/rop-guide" linkTitle="Placeholder Link Title" desc="Replace with your own note" />
        <GuideSection title="Work Study Guide" link="/guides/work-study-guide" linkTitle="Placeholder Link Title" desc="Replace with your own note" />
        <GuideSection title="Section Title Five" link="/guides/"/>

        <section className="guide-section">
          <h2>Resoures</h2>
          <ul className="link-list">
            <li>
              
              <a href="https://future.utoronto.ca/student-clubs">Clubs</a>
            </li>
            <li>
              <a href="https://guides.library.utoronto.ca/tspace/aboutpastexams">UofT Past Exams</a>
            </li>
            <li>Plain text placeholder item with no link, for general info.</li>
          </ul>
        </section>

      </main>
    </div>
  );
}

export default GuidesHome;