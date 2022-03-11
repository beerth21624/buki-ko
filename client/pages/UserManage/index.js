import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Link from 'next/link';
import Layout from '../../component/layout/Layout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer, inject } from 'mobx-react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import SelectUnstyled, {
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const UserManage = (props) => {
  const router = useRouter();
  const { allUser } = props.userStore.toJS();

  useEffect(() => {
    const fetchData = () => {
      props.userStore.getAllUser();
    };
    fetchData();
  }, []);

  const approveUser = async (id) => {
    Swal.fire({
      title: 'อนุมัติ ?',
      text: 'คุณต้องการอนุมัติผู้ใช้ใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.userStore.updateApprove(id);
        if (success) {
          Swal.fire('สำเร็จ!', 'อนุมัติผู้ใช้เรียบร้อย', 'success');
          router.reload();
        }
      }
    });
  };
  const deleteUser = async (id) => {
    Swal.fire({
      title: 'ลบผู้ใช้ ?',
      text: 'คุณต้องการลบผู้ใช้ใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.userStore.deleteUser(id);
        if (success) {
          Swal.fire('สำเร็จ!', 'ลบผู้ใช้เรียบร้อย', 'success');
          router.reload();
        }
      }
    });
  };

  const handleRole = (id, type) => {
    Swal.fire({
      title: 'แก้ไขสิทธิ์ผู้ใช้ ?',
      text: 'คุณต้องการแก้ไขสิทธิ์ผู้ใช้ใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.userStore.updateRole(id, type);
        if (success) {
          Swal.fire('สำเร็จ!', 'แก้ไขสิทธิ์ผู้ใช้เรียบร้อย', 'success');
          router.reload();
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
            padding: '15px',
          }}
        >
          <ListAltIcon />
          <Typography sx={{ color: '#343434' }} variant="body1">
            จัดการผู้ใช้(admin)
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">ผู้ใช้ทั้งหมด</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '100px' }} align="right">
                    ลำดับที่
                  </TableCell>
                  <TableCell align="center">ชื่อ</TableCell>
                  <TableCell align="center">ตำแหน่ง</TableCell>
                  <TableCell sx={{ width: '150px' }} align="center">
                    กำหนดสิทธิ์
                  </TableCell>
                  <TableCell sx={{ width: '140px' }} align="center">
                    ลบผู้ใช้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUser
                  .filter((user) => user.validated && user.role !== 'admin')
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rank}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            // flexDirection: 'column',
                          }}
                        >
                          <Button
                            onClick={() => handleRole(row.id, 'จัดการ')}
                            variant={
                              row.role == 'จัดการ' ? 'contained' : 'outlined'
                            }
                          >
                            จัดการ
                          </Button>
                          <Button
                            onClick={() => handleRole(row.id, 'ผู้ใช้')}
                            variant={
                              row.role == 'ผู้ใช้' ? 'contained' : 'outlined'
                            }
                          >
                            ผู้ใช้
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => deleteUser(row.id)}
                          color="error"
                          variant="contained"
                        >
                          ลบผู้ใช้
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">ผู้ใช้รออนุมัติ</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '100px' }} align="center">
                    ลำดับที่
                  </TableCell>
                  <TableCell align="center">username</TableCell>
                  <TableCell align="center">ชื่อ</TableCell>
                  <TableCell align="center">ตำแหน่ง</TableCell>
                  <TableCell align="center">action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUser
                  .filter((user) => !user.validated)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rank}</TableCell>
                      <TableCell width="20%" align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2px',
                          }}
                        >
                          <Button
                            onClick={() => approveUser(row.id)}
                            color="success"
                            variant="contained"
                          >
                            อนุมัติ
                          </Button>
                          <Button
                            onClick={() => deleteUser(row.id)}
                            color="error"
                            variant="contained"
                          >
                            ลบผู้ใช้
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('userStore')(observer(UserManage));
