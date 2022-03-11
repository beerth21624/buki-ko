import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { observer, inject } from 'mobx-react';
import { useRouter } from 'next/router';

const CustomizedContainer = styled('div')`
  background-image: url('https://images.pexels.com/photos/886454/pexels-photo-886454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
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

function Register(props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('โปรดกรอกยศ-ชื่อ'),
        rank: yup.string().required('โปรดกรอกตำแหน่ง'),
        username: yup.string().required('โปรดกรอกชื่อผู้ใช้'),
        password: yup
          .string()
          .required('โปรดกรอกรหัสผ่าน')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'รหัสผ่านต้อง มากกว่า8ตัว และประกอบด้วย ตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และอักษรพิเศษ'
          ),
      })
    ),
  });
  const handleRegister = async (data) => {
    const resault = await props.authStore.fetchRegister(data);
    resault && router.push('/login');
  };

  return (
    <CustomizedContainer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '50px',
              borderRadius: '20px',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              ลงทะเบียนเข้าใช้งาน
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleRegister)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="ยศ-ชื่อ"
                    autoFocus
                    {...register('name')}
                  />
                  {errors.name && (
                    <Typography color="error">{errors.name.message}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="rank"
                    label="ตำแหน่ง"
                    name="rank"
                    {...register('rank')}
                  />
                  {errors.rank && (
                    <Typography color="error">{errors.rank.message}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    {...register('username')}
                  />
                  {errors.username && (
                    <Typography color="error">
                      {errors.username.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <Typography color="error">
                      {errors.password.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ลงทะทะเบียน
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    มีบัญชีอยู่แล้ว เข้าสู่ระบบ
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </CustomizedContainer>
  );
}

export default inject('authStore')(observer(Register));