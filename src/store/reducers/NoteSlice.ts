import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { INote } from '../../models/INote'
import { dbService } from '../../Services/dbServices';

interface NoteState{
    notes:INote[],
    Category:Category,
    Search:string,
}

export enum Category{
    COMPLETED= 'completed',
    OUTSTANDING= 'outstanding',
    ALL= 'all'
}

const initialState:NoteState = {
    notes:[],
    Category:Category.ALL,
    Search:'',
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
        deleteNote(state, action:PayloadAction<string>) {
            state.notes = state.notes.filter(note=>note.id != action.payload);
        },
        updateNote(state, action:PayloadAction<INote>) {
            state.notes = state.notes.map(note=>note.id == action.payload.id ? action.payload : note);
        },
        changeDone(state, action:PayloadAction<string>) {
            let note = state.notes.find(note=>note.id === action.payload);
            if(note) {
                note.done = !note.done;
            }
        },
        setCategory(state, action:PayloadAction<Category>){
            state.Category = action.payload;
        },
        setSearch(state, action:PayloadAction<string>){
            state.Search = action.payload;
        }
    }
})


export default noteSlice.reducer;