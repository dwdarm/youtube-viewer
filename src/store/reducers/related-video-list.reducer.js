const defaultState = {
  ids: [],
  page: null,
  isReqGet: false,
  hasMore: true
}

const relatedVideoList = (state = { ...defaultState }, { type, payload }) => {
  switch(type) {
    case 'ADD_RELATED_VIDEO_LIST':
      return {
        ...state,
        ids: state.ids.concat(payload.data.items.map(e => e.id.videoId)),
        hasMore: payload.data.items.length > 0,
        page: payload.data.nextPageToken
      }
    case 'SET_REQ_GET_RELATED_VIDEO_LIST':
      return { ...state, isReqGet: payload.status }
    case 'INVALIDATE_RELATED_VIDEO_LIST':
    case 'INVALIDATE':
      return { ...defaultState }
    default:
      return state;
  }
}

const relatedVideoListByVideoId = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_RELATED_VIDEO_LIST':
    case 'SET_REQ_GET_RELATED_VIDEO_LIST':
    case 'INVALIDATE_RELATED_VIDEO_LIST':
    case 'INVALIDATE':
      return { 
        ...state,
        [action.payload.videoId]: relatedVideoList(state[action.payload.videoId], action) 
      }
    default:
      return state;
  }
}

export default relatedVideoListByVideoId;
