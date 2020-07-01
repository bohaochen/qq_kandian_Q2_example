import request from 'utils/request';
import qs from 'qs';
import { API_BASE } from 'constants';

// 埋点上报
export const eventTracking = (data) => {
	return request(`${API_BASE}/event-trackings`, {
		method: 'post',
		body: JSON.stringify(data)
	});
}
// 轮播图
export const getBanners = (slug) => {
	return request(`${API_BASE}/banners/${slug}`);
}
// 获取平台列表
export const getPlatforms = () => {
	return request(`${API_BASE}/platforms`);
}

// 获取微信授权签名
export const getWxData = (formData) => {
	const queryString = qs.stringify(formData)
	return request(`${API_BASE}/wechats/config?${queryString}`);
}

