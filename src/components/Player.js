import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import numFormat from '@dwdarm/num-format/src/num-format';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchVideo } from '../store/actions/videos.action';

const format = { k: 'K', m: 'M', b: 'B' }

const Player = ({ videoId, video, isReqGet, dispatch }) => {
  
  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo(videoId));
    }
  });
  
  if (!video) { 
    return (
      <div className="my-6 has-text-centered">
        <Loader type="Bars" color="#363636" height={80} width={80} />
      </div>
    );
  }
  
  return (
    <div>
    
      <header className="py-4">
        <h1 className="title is-5 is-spaced">{video.snippet.title}</h1>
        <p className="subtitle is-6 has-text-grey has-text-weight-normal">
          {video.snippet.channelTitle}
        </p>
        <p className="subtitle is-6 has-text-grey has-text-weight-normal">
          <span>{numFormat(video.statistics.viewCount, { format })} views • </span>
          <span>{numFormat(video.statistics.likeCount, { format })} likes • </span>
          <span>{numFormat(video.statistics.dislikeCount, { format })} dislikes </span>
        </p>
      </header>
      
      <div 
        className="py-4" 
        style={{
          borderTop:'1px solid hsl(0, 0%, 86%)',
          borderBottom:'1px solid hsl(0, 0%, 86%)'
        }}>
        <p className="subtitle is-6 has-text-grey has-text-weight-normal">
          Pubished at {video.snippet.publishedAt}
        </p>
        <p className="subtitle is-6 has-text-grey has-text-weight-normal">
          {video.snippet.description}
        </p>
      </div>
    
    </div>
  );
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.videoId !== nextProps.videoId) {
    return false;
  }
  
  if ((prevProps.video === null) && (nextProps.video !== null)) {
    return false;
  }
  
  if (prevProps.isReqGet !== nextProps.isReqGet) {
    return false;
  }
  
  return true;
}

const MemoizedPlayer = React.memo(Player, areEqual);

const mapStateToProps = (state, ownProps) => {
  const { videos } = state;
  const video = videos[ownProps.videoId] || { 
    isReqGet: false, 
    isExist: true,
    isComplete: false
  }
  
  return {
    video: video.isComplete ? video : null,
    isReqGet: video.isReqGet
  }
}

export default connect(mapStateToProps)(MemoizedPlayer);
