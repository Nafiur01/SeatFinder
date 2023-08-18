import React from 'react';
import '../css/SearchMenu.css'; // Ensure correct path to CSS file

const SearchMenu = () => {
  return (
    <div className="search-menu-container">
      <div className="search-menu">
        <input type="text" placeholder="Search for an event or join by seatcode" className="search-input" />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchMenu;
