import React from 'react';
import "../style/Navbar.css";

export default function Navbar({ setGrouping, setSortOption }) {
  function myFunction(event) {
    event.stopPropagation();
    document.getElementById("myDropdown").classList.toggle("show");
  }

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
        const dropdown = document.getElementById("myDropdown");
        if (dropdown?.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="dropdown">
          <button className="dropbtn" onClick={myFunction}>Display</button>
          <div id="myDropdown" className="dropdown-content">
            <div>
              <label>Grouping</label>
              <select
                name="Grouping"
                id="Grouping"
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="By Status">By Status</option>
                <option value="By User">By User</option>
                <option value="By Priority">By Priority</option>
              </select>
            </div>
            <div>
              <label>Ordering</label>
              <select
                name="Ordering"
                id="Ordering"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
