import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/reducer.js';
import logger from 'redux-logger'

let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(logger)
});

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

