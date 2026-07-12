import React from "react";

function Card({ title, id, children, footer }) {
  return (
    <section className="card" id={id}>
      <h2 className="card-title">{title}</h2>

      {children}

      {footer && <div className="card-actions">{footer}</div>}
    </section>
  );
}

export default Card;