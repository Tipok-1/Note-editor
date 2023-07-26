import { memo, useState, useMemo, useEffect } from 'react';
import OneNote from '../OneNote.tsx/OneNote';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../hooks/redux';
import { Category } from '../../store/reducers/NoteSlice';
import Typography from '@mui/material/Typography/Typography';
import CustomDrawer from '../CustomDrawer/CustomDrawer';
import { INote } from '../../models/INote';


const NoteList = () => {
    const category = useAppSelector(state => state.noteReducer.Category);
    const { notes } = useAppSelector(state => state.noteReducer)
    const [message, setMessage] = useState('');
    const [openForm, setOpenForm] = useState(false)
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('')

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
    return (
        <Stack sx={{
            flex: '1 1 auto',
            overflowY: 'auto',
            mt: '20px'
        }}
            spacing={2}>
            {!allNotes.length && <Typography>{message}</Typography>}
            {allNotes.map(note => <OneNote
                key={note.id}
                note={note}
                setOpenForm={(note:INote)=>{
                    setTitleValue(note.name);
                    if(note.description) {
                        setDescriptionValue(note.description);
                    }
                    setOpenForm(true)
                }}
            />)}
            <CustomDrawer
                title={'Редактировать заметку'}
                openForm={openForm}
                onClose={() => setOpenForm(false)}
                buttonAcceptText={'Сохранить'}
                value='create'
                titleInputValue={titleValue}
                descriptionInputValue={descriptionValue}
            />
        </Stack>


    );
};

export default memo(NoteList);