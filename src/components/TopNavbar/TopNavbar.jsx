import React from 'react'
import {Box, Typography} from '@cw/rds'
import {CherryworkIcon} from '@cw/rds/icons';
const TopNavbar = () => {
  return (
    <>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 1.5, background: "#1e0c40", margin: -1, color: "white", paddingLeft: "18px" }}>
          <CherryworkIcon size='xxlarge'/>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            letterSpacing: 1,
          }}>User Management Portal</Typography>
        </Box>
    </>
  )
}

export default TopNavbar