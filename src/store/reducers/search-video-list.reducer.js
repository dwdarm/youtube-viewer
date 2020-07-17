const defaultState = {
  ids: [],
  keyword: '',
  page: null,
  isReqGet: false,
  hasMore: true
}

const addSearchVideoList = (state, keyword, data) => {
  const list = state.keyword === keyword ? state : { ...defaultState, keyword }
    
  return {
    ...list,
    ids: list.ids.concat(data.items.map(e => e.id.videoId)),
    hasMore: data.items.length > 0,
    page: data.nextPageToken,
    keyword: keyword
  }
}

const setReq = (state, keyword, method, status) => {
  const list = state.keyword === keyword ? state : { ...defaultState, keyword }
  
  return {
    ...list,
    [`isReq${method}`]: status
  }
} 

export default (state = { ...defaultState }, { type, payload }) => {
  switch(type) {
    case 'ADD_SEARCH_VIDEO_LIST':
      return addSearchVideoList(state, payload.keyword, payload.data);
    case 'SET_REQ_GET_SEARCH_VIDEO_LIST':
      return setReq(state, payload.keyword, 'Get', payload.status);
    case 'INVALIDATE_SEARCH_VIDEO_LIST':
    case 'INVALIDATE':
      return { ...defaultState }
    default:
      return state;
  }
}
