import videoCategoriesApi from './api/video-categories.api';

const addCategoryList = (data) => ({
  type: 'ADD_CATEGORY_LIST',
  payload: { data }
});

const setReqGetCategoryList = (status = true) => ({
  type: 'SET_REQ_GET_CATEGORY_LIST',
  payload: { status }
});

const invalidateCategoryList = (categoryId) => ({
  type: 'INVALIDATE_CATEGORY_LIST'
});

export const fetchCategoryList = (options = {}) => async (dispatch, getState) => {
  const { categoryList } = getState();
  
  if (categoryList.isReqGet) { return Promise.resolve(); }
  dispatch(setReqGetCategoryList());
  
  try {
    const res = await videoCategoriesApi.list({
      part: 'snippet',
      regionCode: 'US'
    });
    
    dispatch(addCategoryList(res));
    dispatch(setReqGetCategoryList(false));
    return res;
    
  } catch(e) { }
} 
