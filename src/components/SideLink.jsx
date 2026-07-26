import { NavLink } from "react-router-dom";

function SideLink({ text, to }) {

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive 
          ? "side-link active"
          : "side-link"
      }
    >
      {text}
    </NavLink>
  );
}

export default SideLink;