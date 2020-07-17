import videosApi from './api/videos.api';

const addVideos = (data) => ({
  type: 'ADD_VIDEOS',
  payload: { data }
});

const setReqGetVideos = (id, status = true) => ({
  type: 'SET_REQ_GET_VIDEOS',
  payload: { id, status }
});

const invalidateVideos = () => ({
  type: 'INVALIDATE_VIDEOS'
});

export const fetchVideo = (id) => async (dispatch, getState) => {
  const { videos } = getState();
  const video = videos[id] || { 
    isReqGet: false, 
    isExist: true, 
    isComplete: false 
  }
  
  if (video.isReqGet || !video.isExist || video.isComplete) { 
    return Promise.resolve(); 
  }
  dispatch(setReqGetVideos(id));
  
  try {
    const res = await videosApi.list({
      part: ['contentDetails', 'player', 'snippet', 'statistics'],
      id: id
    });
    
    dispatch(addVideos(res));
    return res;
    
  } catch(e) { }
} 
