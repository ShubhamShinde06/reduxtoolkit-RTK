import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './reducers/apiSlice'
//import apiDeleteSlice from './reducers/apideleteSlice';

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        //[apiDeleteSlice.reducerPath] : apiDeleteSlice.reducer
    },
    middleware: (prevMiddlewares) => 
        prevMiddlewares().concat([apiSlice.middleware]) //apiDeleteSlice.middleware]),  
})

export {store}  