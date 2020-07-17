const defaultState = {
  isReqGet: false,
  isExist: true
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

export default (state = {}, { type, payload }) => {
  switch(type) {
    case 'ADD_CATEGORIES':
    case 'ADD_CATEGORY_LIST':
      return {
        ...state,
        ...payload.data.items.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.id]: { ...cur, ...defaultState }
          }
        }, {})
      }
    case 'SET_REQ_GET_CATEGORIES':
      return setReq(state, payload.id, 'Get', payload.status);
    case 'SET_EXIST_CATEGORIES':
      return setIsExist(state, payload.id, payload.status);
    case 'INVALIDATE_CATEGORIES':
    case 'INVALIDATE':
      return {}
    default:
      return state;
  }
}
