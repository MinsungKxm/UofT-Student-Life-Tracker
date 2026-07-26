import React from "react";

function Header(){
  return <div>
        <header className="topbar">
        <div className="topbar-left">
          <span className="crest" aria-hidden="true">🎓</span>
          <span className="brand">U OF T</span>
          <span className="brand-divider" />
          <span className="brand-sub">STUDENT LIFE TRACKER</span>
        </div>
        <div className="topbar-right">
          <button className="help-btn" type="button">Need Help?</button>
          <button className="icon-btn" type="button" aria-label="Notifications">🔔</button>
          <div className="user-chip">
            Minsung Kim <span className="chip-caret">▾</span>
          </div>
        </div>
      </header>
  </div>;
}

export default Header;