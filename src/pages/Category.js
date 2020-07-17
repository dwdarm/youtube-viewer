import React from 'react';
import { useParams } from "react-router-dom";
import Layout from '../components/Layout';
import CategoryTitle from '../components/CategoryTitle';
import Videos from '../components/Videos';

export default () => {
  const { id } = useParams();
  
  return (
    <Layout>
      
      <div className="px-5 py-5">
        <div className="container">
          <CategoryTitle categoryId={id}/>
        </div>
      </div>
      
      <div className="video-list-wrapper">
        <div className="container">
          <Videos categoryId={id}/>
        </div>
      </div>
    
    </Layout>
  );
}
