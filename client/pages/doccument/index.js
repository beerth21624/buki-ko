import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
import auth from '../../utilis/authen';
import DeleteIcon from '@mui/icons-material/Delete';

const Doc = (props) => {
  const router = useRouter();
  const { docData } = props.docStore.toJS();
  const [name, setName] = useState('');
  const [FileData, setFileData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await props.docStore.getAll();
      const user = auth.getUserData();
      setUserRole(user?.role);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('uploadFile', FileData);
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
        const success = props.docStore.create(formData);
        if (success) {
          Swal.fire('สำเร็จ!', 'บันทึกรายการเรียบร้อย', 'success');
          router.reload();
        }
      }
    });
  };

  const downloadFile = async (id) => {
    await props.docStore.loadDoc(id);
  };

  const deleteDoc = async (id) => {
    Swal.fire({
      title: 'ลบรายการ ?',
      text: 'คุณต้องการลบรายการใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.docStore.deleteDoc(id);
        if (success) {
          Swal.fire('สำเร็จ!', 'ลบรายการเรียบร้อย', 'success');
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
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListAltIcon />
            <Typography sx={{ color: '#343434' }} variant="body1">
              รายการเอกสาร
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '30px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                width: '75%',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography>ค้นหาเอกสาร</Typography>
                <input onChange={(e) => setSearchData(e.target.value)} />
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#F3F3F3' }}>
                    <TableRow>
                      <TableCell sx={{ width: '15%' }} align="center">
                        วันที่สร้าง
                      </TableCell>
                      <TableCell sx={{ width: '65%' }} align="left">
                        ชื่อเอกสาร
                      </TableCell>
                      <TableCell sx={{ width: '15%' }} align="center">
                        ดาวน์โหลด
                      </TableCell>
                      <TableCell
                        sx={{ width: '5%' }}
                        align="center"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {docData
                      .filter((data) => {
                        if (searchData === '') {
                          return data;
                        } else if (
                          data.docName
                            .toLowerCase()
                            .includes(searchData.toLowerCase())
                        ) {
                          return data;
                        }
                      })
                      .map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {new Date(row.createdAt).toLocaleDateString(
                              'th-TH'
                            )}
                          </TableCell>
                          <TableCell align="left">{row.docName}</TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              onClick={() => downloadFile(row.docFile)}
                              variant="contained"
                            >
                              download
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <DeleteIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={() => deleteDoc(row.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '25%',
                borderLeft: '2px solid #F3F3F3',
                minHeight: '82vh',
              }}
            >
              {' '}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '20px 10px',
                  alignItems: 'flex-start',
                }}
              >
                <Typography variant="h6">เพิ่มเอกสาร</Typography>
                <Box sx={{ display: 'flex', gap: '3px' }}>
                  <Typography variant="body">ชื่อ</Typography>
                  <input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </Box>
                <Box sx={{ display: 'flex', gap: '3px' }}>
                  <input
                    name="uploadFile"
                    type="file"
                    onChange={(e) => setFileData(e.target.files[0])}
                  ></input>
                </Box>

                <Button
                  type="submit"
                  color="info"
                  size="small"
                  variant="contained"
                  sx={{ width: '90%' }}
                >
                  เพิ่ม
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('docStore')(observer(Doc));
