import React from 'react';
import { Link } from 'react-router-dom';

const VideoList = ({ data }) => (
  <div className="columns is-multiline">
    {data.map(e => (
      <div 
        key={e.id} 
        className="column is-full">
        <article className="columns is-mobile">
          <div className="column is-half">
            <figure className="image">
              <img 
                style={{width:'100%'}}
                src={e.snippet.thumbnails.medium.url} 
                alt={e.snippet.title}
              />
            </figure>
          </div>
          <div className="column is-half">
            <p className="text-clipped mb-2">
              <Link className="subtitle is-6 has-text-black" to={`/video/${e.id}`}>
                {e.snippet.title}
              </Link>
            </p>
            <p className="text-clipped is-size-7 has-text-grey">
              {e.snippet.channelTitle}
            </p>
          </div>
          
        </article>
      </div>
    ))}
  </div>
);

const areEqual = (prevProps, nextProps) => {
  if (prevProps.data.length !== nextProps.data.length) {
    return false;
  }
  
  return true;
}

const MemoizedVideoList = React.memo(VideoList, areEqual);

export default MemoizedVideoList
