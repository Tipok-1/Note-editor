import { AppDispatch } from "../store/store";
import { NameOrDescription } from "../models/ITag";
import {tagSlice} from "../store/reducers/TagSlice";
import {noteSlice} from "../store/reducers/NoteSlice";
import { createId } from "./GeneralService";
import { INote } from "../models/INote";

class NoteService{
    _createTags(text:string, position:string, dispatch:AppDispatch, tagId:string[]){
        const pos = position == 'name' ? NameOrDescription.NAME : NameOrDescription.DESCRIPTION;
        let splitText = text.split(' ');
        splitText = splitText.filter(el=>el);
        
        if(splitText.length) {
            splitText.forEach((el, i)=>{
                if(el.match(/^#.+?$/i)) {
                    const id = createId()
                    dispatch(tagSlice.actions.addTag({
                        id,
                        name:el,
                        positionInText:i,
                        location: pos 
                    }))
                    tagId.push(id);
                }
            })
        }
        return splitText.join(' ');
    }
    createNote(n:string, desc:string, dispatch:AppDispatch, updateMode:boolean){
        const tagId:string[] = [];
        const name = this._createTags(n, 'name', dispatch, tagId);
        let description = null;
        if(desc) {
             description = this._createTags(desc, 'description', dispatch, tagId);
        }
        const note:INote = {
            id:createId(),
            name,
            done:false,
            tagsID:tagId
        }
        if(description) {
            note.description = description;
        }
        if(!updateMode) {
            dispatch(noteSlice.actions.addNote(note));
        }
        return note;
        
    }
    _deleteTags(tagsID:string[], dispatch:AppDispatch){
        if(tagsID.length) {
            if(tagsID.length == 1) {
                dispatch(tagSlice.actions.deleteTag(tagsID[0]))
            } else {
                dispatch(tagSlice.actions.deleteFewTags(tagsID))
            }
        }
    }
    deleteNote(note:INote, dispatch:AppDispatch){
        this._deleteTags(note.tagsID, dispatch);
        dispatch(noteSlice.actions.deleteNote(note.id));
    }
    updateNote(oldNote:INote | undefined,n:string, desc:string, dispatch:AppDispatch){
        if(oldNote) {
            this._deleteTags(oldNote.tagsID, dispatch);
            const newNote = this.createNote(n,desc,dispatch, true);
            newNote.id = oldNote.id;
            if(oldNote.done) {
                newNote.done = true;
            }
            dispatch(noteSlice.actions.updateNote(newNote))
        }
    }
    
       
}

export default new NoteService()