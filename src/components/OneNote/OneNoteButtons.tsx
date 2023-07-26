import { memo } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'

interface IOneNoteButtons {
    indented?: boolean,
    onClickEdit: Function,
    onClickDelete: Function
}
const OneNoteButtons = ({ indented, onClickEdit, onClickDelete }: IOneNoteButtons) => {
    return (
        <>
            <Tooltip title="Редактировать" >
                <IconButton sx={{
                    ml: 'auto',
                    '&:hover': {
                        color: '#0288d1'
                    }
                }} onClick={() => onClickEdit()} >
                    <EditNoteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Удалить" sx={{
                mr: (indented ? '24px' : ''),
                '&:hover': {
                    color: '#ef5350'
                }
            }}>
                <IconButton onClick={() => onClickDelete()}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    )
};

export default memo(OneNoteButtons);