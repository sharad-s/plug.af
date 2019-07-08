import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Combine Reducers into rootReducer
import audioReducer from '../features/audioplayer/reducer';
import errorReducer from '../features/errors/reducer';
import authReducer from '../features/auth/reducer';
import plugReducer from '../features/plugs/reducer';
import pageReducer from '../features/page/reducer';




const rootReducer = combineReducers({
  audio: audioReducer,
  errors: errorReducer,
  auth: authReducer,
  plug: plugReducer,
  page: pageReducer

});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

export default store;
