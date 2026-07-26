import React from "react";

function Card({ icon, title, subtitle, badge, id, children, footer }) {
  return (
    <section className="card" id={id}>
      <div className="card-header-row">
        <div className="card-header-left">
          {icon && <div className="card-icon">{icon}</div>}
          <div>
            <h2 className="card-title">{title}</h2>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
        {badge && <span className="card-badge">{badge}</span>}
      </div>

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </section>
  );
}

export default Card;