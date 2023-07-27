import React from 'react';
import Chip from '@mui/material/Chip';

interface ITagChip{
    label:string
}
const TagChip = ({label}:ITagChip) => {

    return (
        <Chip sx={{ alignSelf: 'flex-start' }} label={label} />
    );
};

export default TagChip;