import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/reducer.js';
import logger from 'redux-logger'
// import {createStore, applyMiddleware} from "redux";
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(logger)
});

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

