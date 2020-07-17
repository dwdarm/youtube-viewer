import searchApi from './api/search.api';

const addSearchVideoList = (keyword = '', data) => ({
  type: 'ADD_SEARCH_VIDEO_LIST',
  payload: { keyword, data }
});

const setReqGetSearchVideoList = (keyword, status = true) => ({
  type: 'SET_REQ_GET_SEARCH_VIDEO_LIST',
  payload: { keyword, status }
});

export const fetchSearchVideoList = (keyword = '') => async (dispatch, getState) => {
  const { searchVideoList } = getState();
  const list = searchVideoList.keyword === keyword 
    ? searchVideoList
    : { ids: [], page: null, isReqGet: false, hasMore: true, keyword }
  
  if (list.isReqGet || (list.hasMore === false)) { return Promise.resolve(); }
  dispatch(setReqGetSearchVideoList(keyword));
  
  try {
    const res = await searchApi.list({
      part: 'snippet',
      type: 'video',
      q: keyword,
      maxResults: 10,
      pageToken: list.page ? list.page : undefined
    });
    
    dispatch(addSearchVideoList(keyword, res));
    dispatch(setReqGetSearchVideoList(keyword, false));
    return res;
    
  } catch(e) { }
} 
