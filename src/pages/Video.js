import React from 'react';
import { useParams } from "react-router-dom";
import Layout from '../components/Layout';
import Player from '../components/Player';
import RelatedVideos from '../components/RelatedVideos';

export default () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="section">
        <div className="container">
      
          <div className="columns">
            <div className="column is-8">
              <Player videoId={id}/>
            </div>
            <div className="column">
              <RelatedVideos videoId={id}/>
            </div>
          </div>
      
        </div>
      </div>
    </Layout>
  );
}
