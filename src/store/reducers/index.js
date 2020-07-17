import { combineReducers } from 'redux';
import videos from './videos.reducer';
import videoList from './video-list.reducer';
import relatedVideoList from './related-video-list.reducer';
import searchVideoList from './search-video-list.reducer';
import categories from './categories.reducer';
import categoryList from './category-list.reducer';

const rootReducer = combineReducers({
  videos,
  videoList,
  relatedVideoList,
  searchVideoList,
  categories,
  categoryList,
});

export default rootReducer;
