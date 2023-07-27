import { memo, useState, useMemo, useCallback } from 'react';
import OneNote from '../OneNote/OneNote';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../hooks/redux';
import { Category } from '../../store/reducers/NoteSlice';
import Typography from '@mui/material/Typography/Typography';
import CustomDrawer from '../CustomDrawer/CustomDrawer';
import { INote } from '../../models/INote';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const NoteList = ({ loading }: { loading: boolean }) => {
    const { notes, Search: search, Category: category } = useAppSelector(state => state.noteReducer)
    const tags = useAppSelector(state => state.tagReducer.tags)

    const [message, setMessage] = useState('');
    const [openForm, setOpenForm] = useState(false)
    const [editableNote, setEditableNote] = useState<undefined | INote>(undefined)

    const allNotes = useMemo(() => {
        if (category == Category.ALL) {
            setMessage('Заметок нету')
            return notes;
        } else if (category == Category.COMPLETED) {
            setMessage('Выполненых заметок нету')
            return notes.filter(note => note.done);
        }
        else if (category == Category.OUTSTANDING) {
            setMessage('Неыполненых заметок нету')
            return notes.filter(note => !note.done);
        }
        return [];
    }, [category, notes])

    const allNotesWithSearchFilters = useMemo(() => {
        if (search) {
            return allNotes.filter((el) => {
                for (let i = 0; i < el.tagsID.length; i++) {
                    const tag = tags.find(t => t.id == el.tagsID[i]);
                    if (tag && tag.name.startsWith('#' + search)) {
                        return true;
                    }
                }
                return false;
            })
        }
        return allNotes
    }, [allNotes, search])

    const OpenFormCallback = useCallback((note: INote) => {
        setEditableNote(note)
        setOpenForm(true)
    }, [])
    if (loading) {
        return (
            <Box sx={{
                height:'100%', 
                width:'100%', 
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
                }}>
                <CircularProgress />
            </Box>)
    }
    return (
        <Stack sx={{
            flex: '1 1 auto',
            overflowY: 'auto',
            mt: '20px'
        }}
            spacing={2}>
            {!allNotesWithSearchFilters.length && <Typography>{message}</Typography>}
            {allNotesWithSearchFilters.map(note => <OneNote
                key={note.id}
                note={note}
                setOpenForm={OpenFormCallback}
            />)}
            <CustomDrawer
                title={'Редактировать заметку'}
                openForm={openForm}
                onClose={() => setOpenForm(false)}
                buttonAcceptText={'Сохранить'}
                value='edit'
                note={editableNote}
            />
        </Stack>


    );
};

export default memo(NoteList);