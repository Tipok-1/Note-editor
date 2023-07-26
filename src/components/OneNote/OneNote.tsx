import { useState, useCallback, useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { INote } from '../../models/INote';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '../../hooks/redux';
import { noteSlice } from '../../store/reducers/NoteSlice';
import OneNoteButtons from './OneNoteButtons';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import TagChip from '../TagChip/TagChip';
import { NameOrDescription } from '../../models/ITag';

interface IOneNote {
  note: INote,
  setOpenForm:Function
}

const OneNote = ({ note, setOpenForm}: IOneNote) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();
  const editСallback = useCallback(() => setOpenForm(note), [])
  const tags = useAppSelector(state => state.tagReducer.tags);
  const noteTags = useMemo(() => {
    if (note.tagsID.length) {
      return note.tagsID.map(id => tags.find(tag => tag.id === id));
    }
    return [];
  }, [tags])

  function clickCheckbox(id: string) {
    dispatch(noteSlice.actions.changeDone(id));
  }

  return (
    <Accordion
      expanded={expand}
      sx={{
        borderRadius: '3px',
        '& .MuiAccordionSummary-root:hover, MuiAccordionSummary-root:hover:not(.Mui-disabled)': {
          cursor: 'default',
        }
      }}>
      <AccordionSummary
        style={{ cursor: 'default' }}
        expandIcon={<ExpandMoreIcon
          onClick={() => setExpand((prev) => !prev)}
          sx={{
            cursor: (note.description || note.tagsID.length) ? 'pointer' : 'default',
            visibility: (note.description || note.tagsID.length) ? "visible" : 'hidden',
          }} />}>
        <Checkbox
          color='default'
          onClick={() => clickCheckbox(note.id)}
          checked={note.done} />
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: note.done ? 'line-through' : 'none'
        }}>
          {note.name + (note.done ? " (Выполнено)" : '')}
        </Typography>
        <OneNoteButtons onClick={editСallback} />
      </AccordionSummary>
      <AccordionDetails>
        {note.description &&
          <>
            <Typography
              variant='h6'
              component={'span'}
              sx={{ m: '10px 0', }}>
              Описание
            </Typography>
            <Typography>
              {note.description}
            </Typography>
          </>
        }
        {note.tagsID.length ?
          <Box sx={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography
              variant='h6'
              component={'span'}
              sx={{ m: '10px 0', }}
            >Тэги</Typography>
            <Box sx={{display:'flex'}}>
              {noteTags.length && noteTags.map(tag => <TagChip key={tag?.id} label={tag?.name ? tag?.name : ''} />)}
            </Box>
          </Box>
          : ''
        }
      </AccordionDetails>
    </Accordion>

  );
};

export default OneNote;