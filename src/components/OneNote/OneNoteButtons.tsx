import { memo } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'

interface IOneNoteButtons {
    indented?: boolean,
    onClick: Function
}
const OneNoteButtons = ({ indented, onClick }: IOneNoteButtons) => {
    return (
        <>
            <Tooltip title="Редактировать" >
                <IconButton sx={{
                    ml: 'auto',
                    '&:hover': {
                        color: '#0288d1'
                    }
                }} onClick={() => onClick()} >
                    <EditNoteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Удалить" sx={{
                mr: (indented ? '24px' : ''),
                '&:hover': {
                    color: '#ef5350'
                }
            }}>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    )
};

export default memo(OneNoteButtons);