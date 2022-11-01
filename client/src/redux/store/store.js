import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/reducer.js';

let store = configureStore({
    reducer: rootReducer,
});

export default store;
