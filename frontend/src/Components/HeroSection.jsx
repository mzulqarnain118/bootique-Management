
import React from "react";
import { Box, Button } from '@mui/material'
function HeroSection() {


    return (
        <>
            <Box
                sx={{
                    // backgroundImage: url'),
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}


            >
                <Button variant="contained" color="secondary" size="large"  href='/product'>Shop Now</Button>
            </Box>
        </>
    )

}

export default HeroSection;