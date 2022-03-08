import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Grid from '@mui/material/Grid';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Grid container sx={{ padding: '0px', margin: '0px', height: '100vh' }}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </div>
  );
};

export default Layout;
