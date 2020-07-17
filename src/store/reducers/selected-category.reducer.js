export default (state = '0', { type, payload }) => {
  switch(type) {
    case 'SET_SELECTED_CATEGORY':
      return payload.categoryId;
    case 'INVALIDATE':
      return '0';
    default:
      return state;
  }
}
