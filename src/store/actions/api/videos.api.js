import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const videosApi = {
  
  async list(options = {}) {
    const res = await fetch(buildUrl(BASE_URL, {
      path: 'videos',
      queryParams: { ...options, key: API_KEY }
    }));
    
    if (res.status !== 200) { throw new Error(); }
    
    const json = await res.json();
    
    return json;
  },
  
}

export default videosApi;
