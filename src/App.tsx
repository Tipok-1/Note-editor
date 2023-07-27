import { useEffect, useCallback, useState } from 'react';
import { Container } from '@mui/material';
import ControlPanel from './components/ControlPanel/ControlPanel';
import NoteList from './components/NoteList/NoteList';
import AddNoteButton from './components/AddNoteButton/AddNoteButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dbService } from './Services/dbServices';
import { useAppDispatch } from './hooks/redux';
import { noteSlice } from "./store/reducers/NoteSlice";
import { tagSlice } from './store/reducers/TagSlice';

const Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    setLoading(true);
    const notes = await dbService.getAllNotes();
    const tags = await dbService.getAllTags();
    if (notes) {
      dispatch(noteSlice.actions.setNotes(notes))
    }
    if (tags) {
      dispatch(tagSlice.actions.setTags(tags))
    }
    setLoading(false);
  }, [])
  useEffect(() => {
    getData();
  }, [getData])
  return (
    <ThemeProvider theme={Theme}>
      <Container maxWidth='md' sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ControlPanel />
        <NoteList loading={loading}></NoteList>
        <AddNoteButton />
      </Container>
    </ThemeProvider>
  );
}

export default App;
