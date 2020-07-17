import searchApi from './api/search.api';

const addRelatedVideoList = (videoId, data) => ({
  type: 'ADD_RELATED_VIDEO_LIST',
  payload: { videoId, data }
});

const setReqGetRelatedVideoList = (videoId, status = true) => ({
  type: 'SET_REQ_GET_RELATED_VIDEO_LIST',
  payload: { videoId, status }
});

export const fetchRelatedVideoList = (videoId) => async (dispatch, getState) => {
  const { relatedVideoList } = getState();
  const list = relatedVideoList[videoId] || { 
    ids: [], 
    page: null, 
    isReqGet: false, 
    hasMore: true 
  }
  
  if (list.isReqGet || (list.hasMore === false)) { return Promise.resolve(); }
  dispatch(setReqGetRelatedVideoList(videoId));
  
  try {
    const res = await searchApi.list({
      part: 'snippet',
      type: 'video',
      relatedToVideoId: videoId,
      maxResults: 10,
      pageToken: list.page ? list.page : undefined
    });
    
    dispatch(addRelatedVideoList(videoId, res));
    dispatch(setReqGetRelatedVideoList(videoId, false));
    return res;
    
  } catch(e) { }
} 
