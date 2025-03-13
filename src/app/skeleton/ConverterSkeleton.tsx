import React from 'react';
import { Skeleton, Box } from '@mui/material';

const CurrencyConverterSkeleton = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ my: 2 }} />
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ my: 2 }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ mt: 2 }} />
        </Box>
    );
};

export default CurrencyConverterSkeleton;