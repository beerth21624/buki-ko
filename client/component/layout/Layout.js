import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import auth from '../../utilis/authen';

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const { pathname } = router;
    if (pathname == '/') {
      router.push('/login');
    }
    if (!auth.isAuthenticated()) {
      router.push('/login');
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Grid
        container
        sx={{
          padding: '0px',
          margin: '0px',
          height: '100vh',
        }}
      >
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </div>
  );
};

export default Layout;
