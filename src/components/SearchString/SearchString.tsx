import { useState, useMemo, memo } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton'
import { uniqTagName } from '../../store/reducers/TagSlice';
import Box from '@mui/material/Box/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './SearchString.css'
import Divider from '@mui/material/Divider';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { noteSlice } from '../../store/reducers/NoteSlice';

const SearchString = () => {
    const { Search: text } = useAppSelector(state => state.noteReducer)
    const dispatch = useAppDispatch();
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const tagName = useAppSelector(uniqTagName);
    const tagArray = useMemo(() => {
        const t = '#' + text;
        const arr = tagName.filter(el => el.startsWith(t) && el != t);
        return arr.map(el => el.slice(1))
    }, [text, tagName])
    function changeInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        dispatch(noteSlice.actions.setSearch(e.target.value));
    }
    return (
        <Box
            onFocus={() => setShowAutoComplete(true)}
            onBlur={e => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setShowAutoComplete(false);
                }
            }}
            sx={{ position: 'relative' }}>
            <TextField
                sx={{
                    width: '200px',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => dispatch(noteSlice.actions.setSearch(''))}>
                                <ClearIcon sx={{ visibility: text ? 'visible' : 'hidden' }} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                value={text}
                onChange={e => changeInput(e)}
                type='text'
                label="Поиск по тегам"
                variant="outlined"
            />
            {tagArray.length > 0 &&
                <List className='List'
                    sx={{
                        backgroundColor: 'white',
                        visibility: showAutoComplete ? 'visible' : 'hidden',
                        overflow: 'auto',
                        zIndex: '1',
                        position: 'absolute',
                        width: '100%',
                        outline: '1px solid grey',
                        borderRadius: '5px',
                        maxHeight: '150px',
                    }} >
                    {
                        tagArray.map((el, i) =>
                            <div tabIndex={-1} onClick={() => { dispatch(noteSlice.actions.setSearch(el)) }} key={el}>
                                <ListItem >
                                    <ListItemText primary={el} className='listItem' />
                                </ListItem>
                                {i != tagArray.length - 1 && <Divider light />}
                            </div>)
                    }
                </List>
            }

        </Box>
    );
};

export default memo(SearchString);