import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const videoCategoriesApi = {
  
  async list(options = {}) {
    const res = await fetch(buildUrl(BASE_URL, {
      path: 'videoCategories',
      queryParams: { ...options, key: API_KEY }
    }));
    
    if (res.status !== 200) { throw new Error(); }
    
    const json = await res.json();
    
    return json;
  },
  
}

export default videoCategoriesApi;
