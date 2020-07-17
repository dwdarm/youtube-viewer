import videosApi from './api/videos.api';

const addVideoList = (categoryId, data) => ({
  type: 'ADD_VIDEO_LIST',
  payload: { categoryId, data }
});

const setReqGetVideoList = (categoryId, status = true) => ({
  type: 'SET_REQ_GET_VIDEO_LIST',
  payload: { categoryId, status }
});

const invalidateVideoList = (categoryId) => ({
  type: 'INVALIDATE_VIDEO_LIST',
  payload: { categoryId }
});

export const fetchVideoList = (categoryId = '0') => async (dispatch, getState) => {
  const { videoList } = getState();
  const list = videoList[categoryId] || { 
    ids: [], 
    page: null, 
    isReqGet: false, 
    hasMore: true 
  }
  
  if (list.isReqGet || (list.hasMore === false)) { return Promise.resolve(); }
  dispatch(setReqGetVideoList(categoryId));
  
  try {
    const res = await videosApi.list({
      part: ['contentDetails', 'player', 'snippet', 'statistics'],
      chart: 'mostPopular',
      maxResults: 10,
      videoCategoryId: categoryId,
      pageToken: list.page ? list.page : undefined
    });
    
    dispatch(addVideoList(categoryId, res));
    dispatch(setReqGetVideoList(categoryId, false));
    return res;
    
  } catch(e) { }
} 
