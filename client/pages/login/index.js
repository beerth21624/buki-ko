import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer, inject } from 'mobx-react';
import Link from 'next/link';

const CustomizedContainer = styled('div')`
  background-image: url('https://images.pexels.com/photos/889709/pexels-photo-889709.jpeg?cs=srgb&dl=pexels-specna-arms-889709.jpg&fm=jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-container: center;
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string('***กรุณากรอกชื่อผู้ใช้***')
          .required('***กรุณากรอกชื่อผู้ใช้***'),
        password: yup
          .string('***กรุณากรอกรหัสผ่าน***')
          .required('***กรุณากรอกรหัสผ่าน***'),
      })
    ),
  });
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    props.authStore.fetchLogin(data);
  };
  return (
    <CustomizedContainer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '50px',
              borderRadius: '20px',
            }}
          >
            <Typography component="h1" variant="h5">
              ระบบบริหารคลังอาวุธ
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                {...register('username')}
                autoFocus
              />
              {errors.username && (
                <Typography variant="caption" color="red">
                  {errors.username.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
              />
              {errors.password && (
                <Typography variant="caption" color="red">
                  {errors.password.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {'ยังไม่มีบัญชี สมัครเลย!'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </CustomizedContainer>
  );
};
export default inject('authStore')(observer(Login));
