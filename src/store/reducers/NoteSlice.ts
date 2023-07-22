import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { INote } from '../../models/INote'
import { RootState } from '../store';

interface NoteState{
    notes:INote[],
    Category:Category
}

export enum Category{
    COMPLETED= 'completed',
    OUTSTANDING= 'outstanding',
    ALL= 'all'
}

const initialState:NoteState = {
    notes:[
        {id:1,name:'note', description:"description description descriptiondescriptiondescription descriptiondescription description description", done:false,tagsID:[]},
        {id:2,name:'note', description:"description description descriptiondescriptiondescription descriptiondescription description description", done:false,tagsID:[]},
        {id:3,name:'note', description:"description description descriptiondescriptiondescription descriptiondescription description description", done:false,tagsID:[]},
        {id:4,name:'note', done:false,tagsID:[]},
        {id:5,name:'note', done:false,tagsID:[]},
        {id:6,name:'note', description:"description description descriptiondescriptiondescription descriptiondescription description description", done:false,tagsID:[]},
        {id:7,name:'note', done:false,tagsID:[]},
    ],
    Category:Category.ALL
}

export const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        setNotes(state, action:PayloadAction<INote[]>) {
            state.notes = action.payload;
        },
        addNote(state, action:PayloadAction<INote>) {
            state.notes.push(action.payload);
        },
        deleteNote(state, action:PayloadAction<number>) {
            state.notes = state.notes.filter(note=>note.id != action.payload);
        },
        updateNote(state, action:PayloadAction<INote>) {
            state.notes = state.notes.filter(note=>note.id == action.payload.id ? action.payload : note);
        },
        changeDone(state, action:PayloadAction<number>) {
            let note = state.notes.find(note=>note.id === action.payload);
            if(note) {
                note.done = !note.done
            }
        },
        setCategory(state, action:PayloadAction<Category>){
            state.Category = action.payload;
        }
    }
})


export default noteSlice.reducer;