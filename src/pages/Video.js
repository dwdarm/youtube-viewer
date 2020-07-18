import React from 'react';
import { useParams } from "react-router-dom";
import Layout from '../components/Layout';
import Player from '../components/Player';
import RelatedVideos from '../components/RelatedVideos';

export default () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="container">
      
        <div className="columns is-gapless">
          <div className="column is-8">
            <div className="player-wrapper">
              <div className="iframe">
                <iframe 
                  title={id}
                  src={`https://www.youtube.com/embed/${id}`}
                  allowFullScreen="allowFullScreen">
                </iframe>
              </div>
            </div>
            <div className="px-5 py-5">
              <Player videoId={id}/>
            </div>
          </div>
          <div className="column px-5 py-5">
            <div className="px-5 py-5">
              <RelatedVideos videoId={id}/>
            </div>
          </div>
        </div>
      
        </div>
    </Layout>
  );
}
