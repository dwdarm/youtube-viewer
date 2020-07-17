const defaultCategoryListState = {
  ids: [],
  page: null,
  isReqGet: false,
  hasMore: true
}

export default (state = { ...defaultCategoryListState }, { type, payload }) => {
  switch(type) {
    case 'ADD_CATEGORY_LIST':
      return {
        ...state,
        ids: state.ids.concat(payload.data.items.map(e => e.id)),
        hasMore: payload.data.items.length > 0,
        page: payload.data.nextPageToken
      }
    case 'SET_REQ_GET_CATEGORY_LIST':
      return { ...state, isReqGet: payload.status }
    case 'INVALIDATE_CATEGORY_LIST':
    case 'INVALIDATE':
      return { ...defaultCategoryListState }
    default:
      return state;
  }
}

