/* eslint no-underscore-dangle: ["error", { "allow": ["_store"] }] */
import React from 'react';
import Loadable from 'react-loadable';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Page404 from '@routes/404';
import HomePage from '@routes/homePage';
// import AdvertPage from '@routes/advertPage/advert';
import Loading from '@components/Loading';
import CommonLayout from '@components/CommonLayout';

const loadedModels = new Set();
// 创建路由
const createRoute = (route, index) => {
  console.log('createRoute',createRoute);
  return <Route key={index} {...route}>
    {route.routes ? route.routes.map((c, i) => createRoute(c, i)) : null}
  </Route>
};

// 用于更新routes的组件
class RouteComponent extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'system/updateRoutes',
      payload: this.props.routes,
    });
    this.props.dispatch({
      type: 'system/updatePageLoading',
      payload: false,
    });
  }
  render() {
    return this.props.children;
  }
}

// 异步加载model
const loadModel = async (asynModel, app) => {
  if (asynModel && !asynModel.promise) { // 导入model
    try {
      const { default: model } = await asynModel;
      if (!loadedModels.has(model.namespace)) {
        app.model(model);
        loadedModels.add(model.namespace);
      } else {
        console.error(`Cannot use existing namespace '${model.namespace}'`);
      }
    } catch (err) {
      // console.log(err)
    }
  }
};

const loadableCommon = (route, routeStack, app) => {
  return Loadable({
    loader: async () => {
      app._store.dispatch({
        type: 'system/updatePageLoading',
        payload: true,
      });
      await loadModel(route.model, app);
      if (Array.isArray(route.models)) {
        for (const i in route.models) {
          if ({}.hasOwnProperty.call(route.models, i)) {
            /* eslint-disable */
            await loadModel(route.models[i], app);
            /* eslint-enable */
          }
        }
      }
      return route.component;
    },
    loading: Loading,
    delay: 300,
    render: (loaded, props) => {
      const Component = loaded.default || loaded;
      return (<RouteComponent dispatch={app._store.dispatch} routes={routeStack}>
        <Component {...props} />
      </RouteComponent>);
    },
  });
};

// 解析路由
const parseRoutes = (app, routes, routeStack = []) => {
  let ret = [];
  routes.forEach((route) => {
    const stack = ([...routeStack]).concat([{
      path: route.path,
      breadcrumbName: route.breadcrumbName,
    }]);

    const routeItem = {
      ...route,
      component: loadableCommon(route, stack, app),
      exact: route.exact || true,
    };
    delete routeItem.routes;
    ret.push(routeItem);
    if (Array.isArray(route.routes)) {
      ret = ret.concat(parseRoutes(app, route.routes, stack));
    }
  });
  return ret;
};

function getRoutesByFiles(files, app) {
  let routes = [];
  files.keys().forEach((key) => {
    const configs = files(key).default;
    if (configs) {
      routes = routes.concat(parseRoutes(app, configs));
    }
  });
  return routes;
}

function RouterConfig({ history, app }) {
  const routeFiles = require.context('./routes', true, /route\.js$/);
  const routes = getRoutesByFiles(routeFiles, app);
console.log(routes.map((route, i) => createRoute(route, i)),"111")
  return (<Router history={history}>
      <Switch>
        <Route path="/404" component={Page404} />
        <CommonLayout>
          <Switch>
            {routes.map((route, i) => createRoute(route, i))}
            <Route path="/" component={HomePage} exact/>
            <Redirect to={{ pathname: '/404' }} />
          </Switch>
        </CommonLayout>
      </Switch>
  </Router>);
}

export default RouterConfig;
