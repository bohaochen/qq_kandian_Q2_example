/**
 * 案例详情
 * author: lisa
 * creat: 2018-8-7
 */

 //component
const CasePage = import('./index');



//model
const homePageModel = import('@models/homePageModel');

//路由
const routes = [
  {
    breadcrumbName: '案例详情',
    path: '/casePage',
    model: homePageModel,
    component: CasePage,
  }
];

export default [
  ...routes,
];
