import urlBuilder from '@dwdarm/url-builder';
import { BASE_URL, API_KEY } from './config';

const videoCategoriesApi = {
  
  async list(options = {}) {
    const res = await fetch(urlBuilder(BASE_URL, {
      path: 'videoCategories',
      query: { ...options, key: API_KEY }
    }));
    
    if (res.status !== 200) { throw new Error(); }
    
    const json = await res.json();
    
    return json;
  },
  
}

export default videoCategoriesApi;
