import Immutable from 'immutable';
import pathToRegexp from 'path-to-regexp';
import { parseSearch } from '@utils/tools';
import { getWxData } from 'services/common.js';
import * as Tools from '@utils/tools';

let urlForIos = window.location.href.split("#")[0];

import { IMG_BASE } from 'constants';
const immutableState = Immutable.fromJS({
  pathname: '/', // 当前页面pathname
  query: {}, // 当前页面url查询参数
  routes: [], // 当前页面路由信息
  params: {}, // 当前路由params
  permits: {}, // 权限列表
  pageLoading: false, // 页面是否正在加载
  projectShow: false, // 是否显示项目切换界面
  pageInfo: null, // 当前页面信息
  consultData: null,//咨询信息
});

export default {
  namespace: 'system',
  state: immutableState,
  effects: {
    *setWxShareParam({ payload }, { put }) {
      // if(!(Tools.inWX()&&Tools.inIos())){
      //   //如果不在IOS微信中,则去动态设置URL参数，否则用进入页面的第一个参数
      //   urlForIos = window.location.href.split("#")[0]; 
      // }
      // let { data } = yield getWxData({url:urlForIos});
      // if(!(data&&data.appId)){
      //   return
      // }
      // console.log(data,"------getWxData")
      // console.log(urlForIos,"------urlForIos")
      // wx.config({
      //   debug: false,
      //   appId: data.appId,
      //   timestamp: data.timestamp,
      //   nonceStr: data.nonceStr,
      //   signature: data.signature,
      //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      // });
      // wx.ready(function () {
      //   let shareOptions = {
      //     title: '腾讯看点广告', // 分享标题
      //     desc: '信息流营销最全攻略，点击了解更多',//描述
      //     link: `${window.location.origin}${payload.pathname}${payload.search}`, // 分享链接，该链接域名必须与当前企业的可信域名一致
      //     imgUrl: 'https://img.nfa.qq.com/kandianad/original_8e34829387.jpeg', // 分享图标
      //     success: function () {
      //       // 用户确认分享后执行的回调函数
      //     },
      //     cancel: function () {
      //       // 用户取消分享后执行的回调函数
      //     }
      //   }
      //   wx.onMenuShareTimeline(shareOptions);
      //   wx.onMenuShareAppMessage(shareOptions);
      //   wx.onMenuShareQQ(shareOptions);
      //   wx.onMenuShareWeibo(shareOptions);
      //   wx.onMenuShareQZone(shareOptions);
      // })
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        const query = parseSearch(search);
        //变更路由储存信息
        dispatch({
          type: 'save',
          payload: {
            pathname,
            query,
          },
        });
        //获取微信分享授权
        dispatch({
          type: 'setWxShareParam',
          payload: {
            pathname,
            search
          }
        });
  
      });
    },

  },

  reducers: {
    // 注入权限
    injectPermits(state, action) {
      const { permits } = action.payload;
      return state.merge({ permits });
    },

    // 清空授权
    clearPermits(state) {
      return state.merge({ permits: {} });
    },

    // 更新路由信息
    updateRoutes(state, action) {
      const pathname = state.get('pathname');
      const current = action.payload[action.payload.length - 1];
      const keys = [];
      const match = pathToRegexp(current.path, keys).exec(pathname);
      const params = {};
      keys.forEach((key, i) => {
        params[key.name] = match[i + 1];
      });
      // 处理path中的params
      const routes = action.payload.map((it) => {
        let { path } = it;
        Object.keys(params).forEach((key) => {
          path = path.replace(`:${key}`, params[key]);
        });
        return { ...it, path };
      });
      return state.merge({ routes, params });
    },

    // 更新页面加载状态
    updatePageLoading(state, action) {
      return state.merge({ pageLoading: action.payload });
    },

    save(state, action) {
      return state.merge(action.payload);
    },
  },

};
