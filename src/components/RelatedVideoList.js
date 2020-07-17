import React from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

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
            <h3>
              <Link 
                className="subtitle is-6 has-text-black" to={`/video/${e.id}`}>
                <LinesEllipsis
                  text={e.snippet.title}
                  className="mb-2"
                  maxLine='2'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                />
              </Link>
              <LinesEllipsis
                className="is-size-7 has-text-grey"
                text={e.snippet.channelTitle}
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
              />
            </h3>
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
