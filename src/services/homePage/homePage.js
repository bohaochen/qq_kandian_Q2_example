import request from 'utils/request';
import qs from 'qs';
import { API_BASE } from 'constants';


//首页banner
export async function queryBanner(formData) {
  return request(`${API_BASE}/banners/${formData}`);
}
