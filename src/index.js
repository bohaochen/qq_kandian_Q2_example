import dva from 'dva';
import createBrowserHistory from 'history/createBrowserHistory';
import systemModel from '@models/system';
import homePageModel from'@models/homePageModel';
import 'antd-mobile/dist/antd-mobile.css';
import "amfe-flexible"
// import "lib-flexible"
import router from './router';
import './index.css';

const appOptions = {
  onError(e) {
    console.log('接口调用异常：', e);
  },
};

appOptions.history = createBrowserHistory();

// 1. Initialize
const app = dva(appOptions);

// 2. Plugins
// app.use({});

// 3. Model
app.model(systemModel);
app.model(homePageModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
