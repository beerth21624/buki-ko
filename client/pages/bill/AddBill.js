import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { observer, inject } from 'mobx-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
const CustomizeInput = styled(TextField)`
  width: 60%;
  height: ;
`;
const CustomizeTextArea = styled('textarea')`
  width: 94%;
  height: 100px;
  border-color: lightgrey;
`;

const AddBill = (props) => {
  const router = useRouter();
  const { allWeapon, weaponPageCount, Weapon } = props.weaponStore.toJS();
  const [allCart, setAllCart] = useState([]);
  const [weaponShow, setWeaponShow] = useState([]);
  const [loadding, setLoadding] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openButton, setOpenButton] = useState(false);
  //  useEffect(() => {
  //    if (!Weapon) {
  //      setOpenButton(false);
  //    }
  //  }, [Weapon]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        billNumber: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        agencyName: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        nameRecipient: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        nameApprover: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
        billNote: yup
          .string('***กรุณากรอกข้อมูลให้ถูกต้อง***')
          .required('***กรุณากรอกข้อมูลให้ครบ***'),
      })
    ),
  });
  const onSubmit = (data) => {
    console.log(data);
    const output = {
      ...data,
      cartList: allCart,
    };

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
        const success = props.billStore.createBill(output);
        if (success) {
          Swal.fire('สำเร็จ!', 'บันทึกรายการเรียบร้อย', 'success');
          router.push('/bill');
          // props.billStore.setCreateSuccess();
        }
      }
    });
  };

  const searchGun = () => {
    if (searchText) {
      setOpenButton(true);
    } else {
      setOpenButton(false);
    }
    props.weaponStore.getWeapon(searchText);
  };

  const checkEnterKey = (event) => {
    if (event === 'Enter') {
      searchGun();
    }
  };
  const addToCart = () => {
    const resault = allCart.filter((gun) => gun.gunNumber === Weapon.gunNumber);
    if (resault.length > 0) {
      Swal.fire(
        'คุณเพิ่มรายการนี้แล้ว',
        'โปรดตรวจสอบรายการของคุณอีกครั้ง',
        'error'
      );
      return;
    }

    setAllCart([...allCart, Weapon]);
  };
  function removeCart(gun) {
    const resault = allCart.filter((wea) => wea.gunNumber !== gun.gunNumber);
    setAllCart(resault);
    setWeaponShow([...weaponShow, gun]);
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
            paddingLeft: '15px',
          }}
        >
          <ListAltIcon />
          <Typography sx={{ color: '#343434' }} variant="body1">
            เพิ่มรายการเบิกรับ สป.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', padding: '20px' }}
        >
          {/* ////////////////////////////////// */}

          <Box
            sx={{
              flexGrow: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ width: '7vw' }}>เลขที่ใบเบิก</Typography>
                  <CustomizeInput {...register('billNumber')}></CustomizeInput>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ width: '7vw' }}>หน่วยที่เบิก</Typography>
                  <CustomizeInput {...register('agencyName')}></CustomizeInput>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ width: '7vw' }}>ผู้รับ</Typography>
                  <CustomizeInput
                    {...register('nameRecipient')}
                  ></CustomizeInput>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ width: '7vw' }}>ผู้จ่าย</Typography>
                  <CustomizeInput
                    {...register('nameApprover')}
                  ></CustomizeInput>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>หมายเหตุ</Typography>
              <CustomizeTextArea {...register('billNote')}></CustomizeTextArea>
            </Box>
            {/* ////////////////////////////////// */}
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              <Typography variant="h6">เพิ่มรายการ</Typography>
              {loadding ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80vw',
                    height: '60vh',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      paddingLeft: '20px',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography>ค้นหา</Typography>
                    <input
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => checkEnterKey(e.key)}
                    />
                    <Button
                      color="info"
                      variant="contained"
                      sx={{ marginRight: '20px' }}
                      onClick={() => searchGun()}
                    >
                      ค้นหา
                    </Button>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{}} aria-label="simple table">
                      <TableHead sx={{ backgroundColor: '#E7E7E7' }}>
                        <TableRow>
                          <TableCell align="center">หมายเลขปืน</TableCell>
                          <TableCell align="center">ชื่ออาวุธปืน</TableCell>
                          <TableCell align="center">ใบเบิก</TableCell>
                          <TableCell align="center">ที่จัดเก็บ</TableCell>
                          <TableCell width="15%" align="center">
                            action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="center">
                            {Weapon?.gunNumber || '-'}
                          </TableCell>
                          <TableCell align="center">
                            {Weapon?.gunName || '-'}
                          </TableCell>
                          <TableCell align="center">
                            {Weapon?.gunBill || '-'}
                          </TableCell>
                          <TableCell align="center">
                            {Weapon?.gunStore || '-'}
                          </TableCell>

                          <TableCell align="center">
                            {openButton && (
                              <Button
                                variant="contained"
                                onClick={() => addToCart()}
                              >
                                เพิ่ม
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          </Box>
          {/* ////////////////////////////////// */}
          <Box
            sx={{
              width: '26vw',
              borderLeft: '2px solid #E7E7E7',
              minHeight: '80vh ',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              gap: '20px',
            }}
          >
            <Typography variant="h6">รายการที่เบิก</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#E7E7E7' }}>
                  <TableRow>
                    <TableCell align="center">ชื่อ สป.</TableCell>
                    <TableCell align="center">หมายเลข สป.</TableCell>
                    <TableCell align="center">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCart.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align="center">{row.gunName}</TableCell>
                      <TableCell align="center">{row.gunNumber}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => removeCart(row)}
                        >
                          ลบ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
            >
              <Button
                type="submit"
                sx={{ width: '30%' }}
                color="success"
                variant="contained"
              >
                บันทึก
              </Button>
              <Button sx={{ width: '30%' }} color="error" variant="contained">
                ยกเลิก
              </Button>
            </Box>
          </Box>
          {/* ////////////////////////////////// */}
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('billStore', 'weaponStore')(observer(AddBill));
