import React, { useLayoutEffect } from "react";
import gsap from "gsap";

const Navbar = ({ sections, onNavigate }) => {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".navbar",
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="navbar">
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate(sections.home)}
      >
        Aris`
      </h1>

      <ul className="nav">
        <li onClick={() => onNavigate(sections.home)}>Home</li>
        <li onClick={() => onNavigate(sections.about)}>About</li>
        <li onClick={() => onNavigate(sections.work)}>My Work</li>
        <li onClick={() => onNavigate(sections.pricing)}>Pricing</li>
        <li onClick={() => onNavigate(sections.contact)}>Contact</li>
      </ul>

      <button className="hire" onClick={() => onNavigate(sections.contact)}>
        Hire Me
      </button>
    </div>
  );
};

export default Navbar;
