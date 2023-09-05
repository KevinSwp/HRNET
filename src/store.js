import { configureStore } from '@reduxjs/toolkit';
import saveUserReducer from './reducers/saveUserReducer';

const store = configureStore({
    reducer: {
        employee: saveUserReducer
    },
});

export default store;
