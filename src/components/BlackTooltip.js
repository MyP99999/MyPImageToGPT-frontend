import React from 'react'
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const BlackTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    '& .MuiTooltip-tooltip': { // Target the tooltip's content instead of the popper
        backgroundColor: '#16191C',
        color: 'white',
        maxWidth: '150px', // Correct syntax for max-width in JS object notation
    },
}));

export default BlackTooltip