import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from './reducers/NoteSlice'
import tagReducer from './reducers/TagSlice'

const rootReducer = combineReducers({
    noteReducer,
    tagReducer
});

export const setupStore = ()=>{
    return configureStore({
        reducer:rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];