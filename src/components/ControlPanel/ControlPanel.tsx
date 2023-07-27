import {useState} from 'react';
import { Box } from '@mui/material';
import SearchString from '../SearchString/SearchString'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Category } from '../../store/reducers/NoteSlice';
import { useAppDispatch } from '../../hooks/redux';
import { noteSlice } from '../../store/reducers/NoteSlice';

const ControlPanel = () => {
    const dispatch = useAppDispatch()
    const [selectValue, setSelectValue] = useState('')
    function selectChange(e:SelectChangeEvent<string>){
        setSelectValue(String(e.target.value));
        switch(e.target.value){
            case Category.ALL:
                dispatch(noteSlice.actions.setCategory(Category.ALL));
                break;
            case Category.COMPLETED:
                dispatch(noteSlice.actions.setCategory(Category.COMPLETED));
                break
            case Category.OUTSTANDING:
                dispatch(noteSlice.actions.setCategory(Category.OUTSTANDING));
                break;
                
        }
        
    }
    return (
        <Box sx={{
            height: '80px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}
        >
            <SearchString />
            <FormControl>
                <InputLabel id="ControlPanel__Label">Категории</InputLabel>
                <Select
                    labelId="ControlPanel__Label"
                    id="ControlPanel__Select"
                    label="Категории"
                    variant="outlined"
                    sx={{
                        minWidth: 200
                    }}
                    value={selectValue}
                    onChange={(e)=>selectChange(e)}
                >
                    <MenuItem value={Category['ALL']}>Все</MenuItem>
                    <MenuItem value={Category['COMPLETED']}>Выполненые</MenuItem>
                    <MenuItem value={Category['OUTSTANDING']}>Невыполненые</MenuItem>
                </Select>
            </FormControl>

        </Box>
    );
};

export default ControlPanel;