import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuAppBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '65px',
        position: 'sticky',
        top: 0,
        zIndex: 99,
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#171717' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ระบบบริหารคลังอาวุธ
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
