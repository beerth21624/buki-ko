import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { padding } from '@mui/system';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer, inject } from 'mobx-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
const CustomizeInput = styled(TextField)`
  width: 60%;
`;
const FieldContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextInput = styled('p')`
  font-size: 16px;
  width: 120px;
`;
const TextArea = styled('textarea')`
  width: 60%;
  height: 120px;
`;
const CustomizeButton = styled(Button)`
  width: 200px;
  height: 40px;
`;
const CustomizeImg = styled(Button)`
  width: 80%;
  height: 40vh;
`;

const WeaponImage = styled('img')`
  width: 26vw;
  height: 150px;
`;
const AddPll = (props) => {
  const router = useRouter();
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        pllNumber: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        pllName: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        pllQty: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        pllNote: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        pllGun: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
      })
    ),
  });
  const handleGenError = () => {
    if (Object.keys(errors).length === 0) {
      return;
    } else {
      return '***กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน***';
    }
  };
  const onSubmit = (data) => {
    Swal.fire({
      title: 'บันทึกรายการ ?',
      text: 'คุณต้องการบันทึกรายการใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.pllStore.createPll(data);
        if (success) {
          Swal.fire('สำเร็จ!', 'บันทึกรายการเรียบร้อย', 'success');
          router.push('/pll');
          props.pllStore.setCreateSuccess();
        }
      }
    });
  };
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '78vw',
          minHeight: '88vh',
          borderRadius: '8px',
          position: 'relative',
          left: '1vw',
          top: '2vh',
          border: '2px solid #E7E7E7',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#F3F3F3',
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '15px',
          }}
        >
          <ListAltIcon />
          <Typography sx={{ color: '#343434' }} variant="body1">
            เพิ่มรายการชิ้นส่วนซ่อม
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', padding: '20px' }}>
          <Box sx={{ flexGrow: '1', maxHeight: '90vh' }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',

                padding: '30px',
                gap: '10px',
              }}
            >
              <FieldContainer>
                <TextInput>ชื่อชิ้นส่วนซ่อม</TextInput>
                <CustomizeInput {...register('pllName')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>หมายเลขชิ้นส่วนซ่อม</TextInput>
                <CustomizeInput {...register('pllNumber')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>ชิ้นส่วนซ่อมคงเหลือ</TextInput>
                <CustomizeInput {...register('pllQty')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>ใช้กับปืน</TextInput>
                <CustomizeInput {...register('pllGun')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>หมายเหตุ</TextInput>
                <TextArea {...register('pllNote')}></TextArea>
              </FieldContainer>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Typography color="error">{handleGenError()}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '50px',
                }}
              >
                <CustomizeButton
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  บันทึก
                </CustomizeButton>
                <CustomizeButton href="/pll" color="error" variant="contained">
                  ยกเลิก
                </CustomizeButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('pllStore')(observer(AddPll));
