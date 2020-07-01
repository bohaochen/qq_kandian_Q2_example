import Immutable from 'immutable';
import { queryBanner } from 'services/homePage/homePage';

const immutableState = Immutable.fromJS({
  banners: null
});

export default {
  namespace: 'homePage',

  state: immutableState,
  effects: {
    *getBanners({ payload }, { put }) {
      let { data } = yield queryBanner('homepage');
      yield put({
        type: 'save',
        payload: {
          banners: data.images,
        },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == "/homePage" || pathname === '/') {
        
          dispatch({
            type: 'getBanners',
          });
        

        }

      });
    },
  },

  reducers: {

    save(state, action) {
      return state.merge(action.payload);
    },
  },

};
