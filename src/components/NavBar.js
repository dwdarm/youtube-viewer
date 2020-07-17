import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const history = useHistory();
  
  const handleTriggerClick = e => {
    e.preventDefault();
    menuRef.current.classList.toggle('is-active');
  }
  
  const handleSearch = () => {
    const keyword = searchRef.current.value;
    if (keyword.length > 0) {
      history.replace(`/search/${keyword}`);
    }
  }
  
  return (
    <nav className="navbar" style={{borderBottom:'1px solid hsl(0, 0%, 86%)'}}>
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/"><strong>Youtube viewer</strong></Link>
          <a role="button" className="navbar-burger burger" onClick={handleTriggerClick}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div ref={menuRef} className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field has-addons">
                <p className="control">
                  <input ref={searchRef} className="input" type="text" placeholder="Search for video..."/>
                </p>
                <p className="control">
                  <button onClick={handleSearch} className="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
