import React from 'react';
import Layout from '../components/Layout';
import Videos from '../components/Videos';
import Categories from '../components/Categories';

export default () => (
  <Layout>
  
    <div 
      className="py-4"
      style={{borderBottom:'1px solid hsl(0, 0%, 86%)'}}>
      <div className="container">
        <Categories/>
      </div>
    </div>
    
    <div className="video-list-wrapper">
      <div className="container">
        <Videos categoryId="0"/>
      </div>
    </div>
    
  </Layout>
)
