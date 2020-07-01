/**
 * 场地管理——route
 * author: lisa
 * creat: 2018-8-7
 */

 //component
const HomePage = import('./index');



//model
const homePageModel = import('@models/homePageModel');

//路由
const routes = [
  {
    breadcrumbName: '广告位列表',
    path: '/homePage',
    model: homePageModel,
    component: HomePage,
  }
];

export default [
  ...routes,
];
