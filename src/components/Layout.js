import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default ({ children }) => (
  <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
    <NavBar/>
    <div className="mb-5" style={{flex:1}}>{children}</div>
    <Footer/>
  </div>
); 
