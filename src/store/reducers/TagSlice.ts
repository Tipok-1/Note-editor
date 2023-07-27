import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { ITag } from '../../models/ITag'
import { RootState } from '../store'

interface TagState{
    tags:ITag[]
}

const initialState:TagState = {
    tags:[]
}

export const tagSlice = createSlice({
    name:'tag',
    initialState,
    reducers:{
        setTags(state, action:PayloadAction<ITag[]>) {
            state.tags = action.payload;
        },
        addTag(state, action:PayloadAction<ITag>) {
            state.tags.push(action.payload);
        },
        deleteTag(state, action:PayloadAction<string>) {
            state.tags = state.tags.filter(tag=>tag.id != action.payload);
        },
        deleteFewTags(state, action:PayloadAction<string[]>) {
            state.tags = state.tags.filter(tag=>{
                for(let i = 0; i<action.payload.length; i++) {
                    if(tag.id == action.payload[i]) {
                        return false;
                    }
                }
                return true;
            })
        },
    }
})

export const uniqTagName = createSelector(
    (state:RootState)=>state.tagReducer.tags,
    (tags)=>{
        const uniqNameSet = new Set(tags.map(el=>el.name));
        return Array.from(uniqNameSet);
    }
);


export default tagSlice.reducer;