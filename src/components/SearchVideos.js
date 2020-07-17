import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSearchVideoList } from '../store/actions/search-video-list.action';
import VideoList from './VideoList';

const Videos = ({ videos, keyword, isReqGet, dispatch }) => {
  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchSearchVideoList(keyword));
    }
  });
  
  const handleLoadMore = () => {
    dispatch(fetchSearchVideoList(keyword));
  }
  
  return (
    <>
    <VideoList data={videos} />
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
  
  if (prevProps.keyword !== nextProps.keyword) {
    return false;
  }
  
  if (prevProps.isReqGet !== nextProps.isReqGet) {
    return false;
  }
  
  return true;
}

const MemoizedVideos = React.memo(Videos, areEqual);

const mapStateToProps = (state, ownProps) => {
  const { videos, searchVideoList } = state;
  const list = searchVideoList.keyword === ownProps.keyword 
    ? searchVideoList
    : { ids: [], page: null, isReqGet: false, hasMore: true, keyword: ownProps.keyword }
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

export default connect(mapStateToProps)(MemoizedVideos);
