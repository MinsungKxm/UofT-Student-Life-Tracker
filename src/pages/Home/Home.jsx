import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '📅', title: 'Calendar & Deadlines', desc: 'Track classes, assignments, and deadlines in one place.' },
  { icon: '✓', title: 'Task Checklist', desc: 'Stay on top of enrolment, TCard pickup, and more.' },
  { icon: '🔗', title: 'Quick Links', desc: 'Jump straight to ACORN, Quercus, Crowdmark, and MarkUs.' },
  { icon: '🏃', title: 'Fitness Tracker', desc: 'Log workouts and keep an eye on your weekly activity.' },
];

function Home() {
  return (
    <div className="home-page">
      <header className="home-topbar">
        <div className="home-topbar-left">
          <span className="crest">🎓</span>
          <span className="brand">UofT Student Life Tracker</span>
        </div>
        <div className="home-topbar-right">
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </header>

      <main className="home-hero">
        <div className="home-hero-content">
          <h1>Everything for your U of T life, in one dashboard.</h1>
          <p>
            Track your classes, deadlines, calendar, and fitness goals —
            plus quick access to ACORN, Quercus, Crowdmark, and MarkUs.
          </p>
          <div className="home-hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">I already have an account</Link>
          </div>
        </div>
      </main>

      <section className="home-features">
        <div className="home-features-grid">
          {FEATURES.map((f) => (
            <div className="home-feature-card" key={f.title}>
              <span className="home-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>Built by students, for students. Not affiliated with the University of Toronto.</p>
      </footer>
    </div>
  );
}

export default Home;