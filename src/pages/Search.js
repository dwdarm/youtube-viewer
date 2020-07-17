import React from 'react';
import { useParams } from "react-router-dom";
import Layout from '../components/Layout';
import SearchVideos from '../components/SearchVideos';

export default () => {
  const { keyword } = useParams();
  
  return (
    <Layout>
      
      <div className="px-5 py-5">
        <div className="container">
          <p className="title is-5">Search result for "{keyword}"</p>
        </div>
      </div>
      
      <div className="video-list-wrapper">
        <div className="container">
          <SearchVideos keyword={keyword}/>
        </div>
      </div>
    
    </Layout>
  );
}
