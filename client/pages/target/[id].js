import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
const UpdateTarget = (props) => {
  const { TargetData } = props.targetStore.toJS();
  const router = useRouter();
  const paramId = router.asPath.split('/')[2];
  const [status, setStatus] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resault = await props.targetStore.getTarget(paramId);
      if (resault) {
        setValue('targetName', resault.targetName);
        setValue('targetBill', resault.targetBill);
        setValue('targetQty', resault.targetQty);
        setValue('targetNote', resault.targetNote);
      }
    };
    fetchData();
  }, [paramId]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        targetName: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        targetQty: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        targetBill: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        targetNote: yup
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
      title: 'แก้ไขรายการ ?',
      text: 'คุณต้องการบันทึกแก้ไขรายการใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.targetStore.updateTarget(data);
        if (success) {
          Swal.fire('สำเร็จ!', 'แก้ไขรายการเรียบร้อย', 'success');
          router.push('/target');
          props.targetStore.setCreateSuccess();
        }
      }
    });
  };
  function deleteWeapon(number) {
    Swal.fire({
      title: 'ลบรายการ ?',
      text: 'คุณต้องการลบรายการใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.targetStore.deleteTarget(number);
        if (success) {
          Swal.fire('สำเร็จ!', 'ลบรายการเรียบร้อย', 'success');
          router.push('/target');
          props.targetStore.setCreateSuccess();
        }
      }
    });
  }
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
            padding: '0 15px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListAltIcon />
            <Typography sx={{ color: '#343434' }} variant="body1">
              แก้ไขรายการเป้า
            </Typography>
          </Box>
          <Button
            onClick={() => deleteWeapon(gunNumber)}
            color="error"
            size="small"
            variant="contained"
          >
            ลบรายการ
          </Button>
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
                <TextInput>ชื่อเป้า</TextInput>
                <CustomizeInput {...register('targetName')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>หมายเลขใบเบิก</TextInput>
                <CustomizeInput disabled {...register('targetBill')} />
              </FieldContainer>
              <FieldContainer>
                <TextInput>จำนวนเป้าคงเหลือ</TextInput>
                <CustomizeInput {...register('targetQty')} />
              </FieldContainer>

              <FieldContainer>
                <TextInput>หมายเหตุ</TextInput>
                <TextArea {...register('targetNote')}></TextArea>
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
                  marginTop: '20px',
                }}
              >
                <CustomizeButton
                  type="submit"
                  color="success"
                  variant="contained"
                >
                  บันทึก
                </CustomizeButton>
                <CustomizeButton
                  href="/target"
                  color="error"
                  variant="contained"
                >
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

export default inject('targetStore')(observer(UpdateTarget));
