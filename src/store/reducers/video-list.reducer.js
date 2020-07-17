const defaultState = {
  ids: [],
  page: null,
  isReqGet: false,
  hasMore: true
}

const videoList = (state = { ...defaultState }, { type, payload }) => {
  switch(type) {
    case 'ADD_VIDEO_LIST':
      return {
        ...state,
        ids: state.ids.concat(payload.data.items.map(e => e.id)),
        hasMore: payload.data.items.length > 0,
        page: payload.data.nextPageToken
      }
    case 'SET_REQ_GET_VIDEO_LIST':
      return { ...state, isReqGet: payload.status }
    case 'INVALIDATE_VIDEO_LIST':
    case 'INVALIDATE':
      return { ...defaultState }
    default:
      return state;
  }
}

const videoListByCategory = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_VIDEO_LIST':
    case 'SET_REQ_GET_VIDEO_LIST':
    case 'INVALIDATE_VIDEO_LIST':
    case 'INVALIDATE':
      return { 
        ...state,
        [action.payload.categoryId]: videoList(state[action.payload.categoryId], action) 
      }
    default:
      return state;
  }
}

export default videoListByCategory;
