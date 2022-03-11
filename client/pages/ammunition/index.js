import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout/Layout';
import WeaponCard from '../../component/layout/weapon/WeaponCard';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { borderRadius, padding } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { observer, inject } from 'mobx-react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import auth from '../../utilis/authen';
import Swal from 'sweetalert2';

const CustomizeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  width: 23%;
  height: 340px;
  border-radius: 10px;
  box-shadow: 0px 5px 33px -15px rgba(0, 0, 0, 0.49);
  gap: 10px;
`;
const CustomizeImg = styled(Paper)`
  width: 100%;
  height: 170px;
`;

const Ammunition = (props) => {
  const { allAmmu, ammuPageCount, createSuccess } = props.ammuStore.toJS();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [paginationStart, setPaginationStart] = useState(false);
  const [updataShow, setUpdataShow] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = auth.getUserData();
    setUserRole(user?.role);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await props.ammuStore.getAllAmmu(page, '');
      setPaginationStart(false);
    };

    fetchData();
  }, [page, createSuccess, updataShow]);
  const handleChange = (e, value) => {
    setPage(value);
  };
  const filterSearch = async () => {
    if (Boolean(searchText) == false) {
      setUpdataShow(!updataShow);
      setPage(1);
    }

    if (searchText) {
      setPaginationStart(true);
      await props.ammuStore.getAllAmmu(1, searchText);
    }
  };
  const checkEnterKey = (event) => {
    if (event === 'Enter') {
      filterSearch();
    }
  };
  const validateRole = () => {
    Swal.fire('ไม่มีสิทธ์', 'คุณต้องมีสิทธิ์ระดับจัดการขึ้นไป', 'error');
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
              รายการกระสุน
            </Typography>
          </Box>
          {userRole === 'ผู้ใช้' ? (
            <Button disabled size="small" variant="contained">
              เพิ่มรายการกระสุน
            </Button>
          ) : (
            <Link href="/ammunition/AddAmmunition">
              <Button size="small" variant="contained">
                เพิ่มรายการกระสุน
              </Button>
            </Link>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box sx={{ padding: '20px' }}>
            {/* <Link href="/weapon/AddWeapon">
              <Button variant="contained">เพิ่มรายการอาวุธ</Button>
            </Link> */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0 20px',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 20px 10px',
                gap: '10px',
              }}
            >
              <Typography>ค้นหาด้วยหมายเลขLOT</Typography>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => checkEnterKey(e.key)}
              />
              <Button
                color="success"
                variant="contained"
                onClick={() => filterSearch()}
              >
                ค้นหา
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#F3F3F3' }}>
                  <TableRow>
                    <TableCell align="center">ชื่อ</TableCell>
                    <TableCell align="center">หมายเลข LOT</TableCell>
                    <TableCell align="center">หมายเลขใบเบิก</TableCell>
                    <TableCell align="center">จำนวนคงเหลือ</TableCell>
                    <TableCell align="center">หมายเหตุ</TableCell>
                    <TableCell align="center">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allAmmu.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.ammuName}</TableCell>
                      <TableCell align="center">{row.ammuLot}</TableCell>
                      <TableCell align="center">{row.ammuBill}</TableCell>
                      <TableCell align="center">{row.ammuQty}</TableCell>
                      <TableCell align="center">{row.ammuNote}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                          }}
                        >
                          {userRole === 'ผู้ใช้' ? (
                            <>
                              {' '}
                              <Link href={`/ammunition/${row.ammuLot}`}>
                                <Button
                                  disabled
                                  color="warning"
                                  variant="contained"
                                >
                                  แก้ไข
                                </Button>
                              </Link>
                              <Link href={`/ammunition/bill/${row.ammuLot}`}>
                                <Button
                                  disabled
                                  color="warning"
                                  variant="contained"
                                >
                                  เบิกจ่าย
                                </Button>
                              </Link>
                            </>
                          ) : (
                            <>
                              {' '}
                              <Link href={`/ammunition/${row.ammuLot}`}>
                                <Button color="warning" variant="contained">
                                  แก้ไข
                                </Button>
                              </Link>
                              <Link href={`/ammunition/bill/${row.ammuLot}`}>
                                <Button color="warning" variant="contained">
                                  เบิกจ่าย
                                </Button>
                              </Link>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <Stack spacing={2}>
                {paginationStart ? (
                  <Pagination
                    onChange={handleChange}
                    page={1}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                  />
                ) : (
                  <Pagination
                    onChange={handleChange}
                    page={page}
                    color="primary"
                    count={ammuPageCount}
                    variant="outlined"
                    shape="rounded"
                  />
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('ammuStore')(observer(Ammunition));
