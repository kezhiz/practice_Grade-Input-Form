import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer";
import "./styles/style.css";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/" className="navbar_logo">
          ZHI<span>YU</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="about">About</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
