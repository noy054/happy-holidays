import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Sidebar.css";

const Sidebar = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar__list">
          {items.map((item, index) => (
            <li className="sidebar__item" key={index}>
              <a href={item.link} className="sidebar__link">
                {item.icon && (
                  <span className="sidebar__icon">{item.icon}</span>
                )}
                <span className="sidebar__text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__toggle" onClick={toggleSidebar}>
        {<FontAwesomeIcon icon="fa-solid fa-bars" size="2xl" />}
      </div>
    </div>
  );
};

export default Sidebar;
