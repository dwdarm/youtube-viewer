import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRelatedVideoList } from '../store/actions/related-video-list.action';
import RelatedVideoList from './RelatedVideoList';

const RelatedVideos = ({ videos, isReqGet, videoId, dispatch }) => {
  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchRelatedVideoList(videoId));
    }
  });
  
  const handleLoadMore = () => {
    dispatch(fetchRelatedVideoList(videoId));
  }
  
  return (
    <>
    <RelatedVideoList data={videos} />
    <>
      { videos.length > 0 
        ? <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button 
                className={`button ${isReqGet ? 'is-loading' : ''}`}
                onClick={handleLoadMore}>
                Load more
              </button>
            </div>
          </div>
        : null
      }
      </>
    </>
  )
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.videos.length !== nextProps.videos.length) {
    return false;
  }
  
  if (prevProps.isReqGet !== nextProps.isReqGet) {
    return false;
  }
  
  return true;
}

const MemoizedRelatedVideos = React.memo(RelatedVideos, areEqual);

const mapStateToProps = (state, ownProps) => {
  const { videos, relatedVideoList } = state;
  const list = relatedVideoList[ownProps.videoId] || { 
    ids: [], 
    page: null, 
    isReqGet: false, 
    hasMore: true 
  }
  const data = []
  
  list.ids.forEach(id => {
    if (videos[id]) {
      data.push(videos[id]);
    }
  });
  
  return {
    videos: data,
    isReqGet: list.isReqGet
  }
}

export default connect(mapStateToProps)(MemoizedRelatedVideos);
