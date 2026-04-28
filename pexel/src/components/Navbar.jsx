import React from "react";

const Navbar = () => {
  const menuItems = ["Discover", "Collections", "Photographers", "About"];
  return (
    <nav>
      <div className="nav-logo">
        Lens<span>folio</span>
      </div>
      <ul className="nav-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href="#" className={item === "Discover" ? "active" : ""}>
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <div className="nav-badge">API v1</div>
      </div>
    </nav>
  );
};

export default Navbar;
