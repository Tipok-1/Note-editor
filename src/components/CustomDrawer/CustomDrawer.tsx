import Drawer from '@mui/material/Drawer/Drawer';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles'
import { useState, memo, useRef, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux';
import CheckTagInput from '../CheckTagInput/CheckTagInput';
import Slide from '@mui/material/Slide';
import NoteService from '../../Services/NoteService';
import Alert from '@mui/material/Alert';
import { INote } from '../../models/INote';

interface ICustomDrawer {
  openForm: boolean,
  onClose: Function,
  title: string,
  buttonAcceptText: string,
  value: string,
  note?: INote
}


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: theme.breakpoints?.values.md,
    margin: 'auto'
  }
}));

const CustomDrawer = ({ openForm, onClose, title, buttonAcceptText, value, note }: ICustomDrawer) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [getTitle, setGetTitle] = useState(false);
  const [getDescription, setGetDescription] = useState(false);
  const description = useRef('')
  const name = useRef('')
  const [showAlert, setShowAlert] = useState(false);

  function closeDrawer() {
    name.current = '';
    description.current = '';
    onClose();
  }

  function addNote() {
    setGetTitle(true);
    setGetDescription(true);
  }

  useEffect(() => {
    if (getTitle && getDescription) {
      if (value == 'create') {
        if (name.current) {
          NoteService.createNote(name.current, description.current, dispatch, false);
          onClose();
        } else {
          if (!showAlert) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000)
          }
        }
      } else if (value == 'edit') {
        if (name.current) {
          NoteService.updateNote(note, name.current, description.current, dispatch);
          onClose();
        } else {
          if (!showAlert) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000)
          }
        }
      }
      setGetDescription(false);
      setGetTitle(false);
    }
  }, [getDescription, getTitle])


  return (
    <Drawer
      anchor='bottom'
      open={openForm}
      onClose={() => closeDrawer()}
      classes={{ paper: classes.paper }}

    >
      <Container maxWidth='md' sx={{ padding: '40px' }}>
        <Typography
          variant='h5'
          component={'h5'}
          color={'grey'}
          sx={{ mb: '20px' }}>{title}</Typography>
        <FormControl sx={{ width: '100%' }}>

          <CheckTagInput
            height={60}
            placeholder='Название'
            InputValue={note ? note.name : undefined}
            getAllText={getTitle}
            getTextRef={name}
          />
          <div style={{ height: '20px' }}></div>
          <CheckTagInput
            height={120}
            placeholder='Описание'
            InputValue={note ? note.description : undefined}
            getAllText={getDescription}
            getTextRef={description}
          />
          <Box sx={{
            mt: '20px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button onClick={() => closeDrawer()} variant='outlined' color="error">Отменить</Button>
            <Button variant='outlined' onClick={() => addNote()}>{buttonAcceptText}</Button>
          </Box>

        </FormControl>
      </Container>
      <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
        <Alert severity="error" sx={{ position: 'absolute', width: '60%', ml: '20%', top: '75%', }}>Поле 'Название' не может быть пустым </Alert>
      </Slide>
    </Drawer>
  );
};

export default memo(CustomDrawer);