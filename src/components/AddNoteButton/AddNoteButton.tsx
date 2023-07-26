import { useState, useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CustomDrawer from '../CustomDrawer/CustomDrawer';

const AddNoteButton = () => {
  const [openForm, setOpenForm] = useState(false);
  const closeForm = useCallback(() => setOpenForm(false), [])

  return (
    <Box sx={{
      m: '12px 0',
      display: 'flex',
      justifyContent: 'end'
    }}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>
      <CustomDrawer
        title={'Создать заметку'}
        openForm={openForm}
        onClose={closeForm}
        buttonAcceptText={'Создать'}
        value='create'
      />
    </Box>
  );
};

export default AddNoteButton;