import { compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/reducer.js';
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = configureStore({
    reducer: rootReducer,
    enhancers: composeEnhancers,
});

export default store;
