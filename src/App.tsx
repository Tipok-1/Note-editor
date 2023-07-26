import { Container } from '@mui/material';
import ControlPanel from './components/ControlPanel/ControlPanel';
import NoteList from './components/NoteList/NoteList';
import AddNoteButton from './components/AddNoteButton/AddNoteButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Container maxWidth='md' sx={{
        height:'100vh',
        display:'flex',
        flexDirection:'column'
      }}>
        <ControlPanel/>
        <NoteList></NoteList>
        <AddNoteButton/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
