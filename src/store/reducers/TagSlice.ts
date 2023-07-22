import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITag } from '../../models/ITag'

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
        deleteTag(state, action:PayloadAction<number>) {
            state.tags = state.tags.filter(tag=>tag.id != action.payload);
        },
    }
})

export default tagSlice.reducer;