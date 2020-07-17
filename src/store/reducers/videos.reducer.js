const defaultState = {
  isReqGet: false,
  isExist: true,
  isComplete: false
}

const setReq = (state, id, method, status) => {
  const item = state[id] || { ...defaultState }
  
  return {
    ...state,
    [id]: { 
      ...item,
      [`isReq${method}`]: status
    }
  }
} 

const setIsExist = (state, id, status) => {
  const item = state[id] || { ...defaultState }
  
  return {
    ...state,
    [id]: { 
      ...item,
      isExist: status
    }
  }
} 

const setIsComplete = (state, id, status) => {
  const item = state[id] || { ...defaultState }
  
  return {
    ...state,
    [id]: { 
      ...item,
      isComplete: status
    }
  }
} 

export default (state = {}, { type, payload }) => {
  switch(type) {
    case 'ADD_VIDEOS':
    case 'ADD_VIDEO_LIST':
      return {
        ...state,
        ...payload.data.items.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.id]: { ...cur, ...defaultState, isComplete: true }
          }
        }, {})
      }
    case 'ADD_RELATED_VIDEO_LIST':
    case 'ADD_SEARCH_VIDEO_LIST':
      return {
        ...state,
        ...payload.data.items.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.id.videoId]: { ...cur, id: cur.id.videoId, ...defaultState }
          }
        }, {})
      }
    case 'SET_REQ_GET_VIDEOS':
      return setReq(state, payload.id, 'Get', payload.status);
    case 'SET_EXIST_VIDEOS':
      return setIsExist(state, payload.id, payload.status);
    case 'SET_COMPLETE_VIDEOS':
      return setIsComplete(state, payload.id, payload.status);
    case 'INVALIDATE_VIDEOS':
    case 'INVALIDATE':
      return {}
    default:
      return state;
  }
}
