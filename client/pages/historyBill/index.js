import { Box, Button, Typography } from '@mui/material';
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
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { observer, inject } from 'mobx-react';

const HistoryBill = (props) => {
  const { allSubBill, subBillPageCount } = props.subBillStore.toJS();
  const [page, setPage] = useState(1);
  const [typePage, setTypePage] = useState('');
  console.log(allSubBill);

  useEffect(() => {
    const fetchData = async () => {
      await props.subBillStore.getAllSubBill(page, typePage);
    };
    fetchData();
  }, [typePage, page]);
  const handleChange = (e, value) => {
    setPage(value);
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
              ประวัติรายการเบิกจ่าย
            </Typography>
          </Box>
          {/* <Link href="/bill/AddBill">
            <Button size="small" variant="contained">
              เพิ่มรายการเบิกยืม
            </Button>
          </Link> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '30px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '20px 0',
            }}
          >
            <Button
              onClick={() => setTypePage('')}
              variant="contained"
              color={typePage === '' ? 'primary' : 'secondary'}
            >
              ทั้งหมด
            </Button>
            <Button
              onClick={() => setTypePage('ammu')}
              variant="contained"
              color={typePage === 'ammu' ? 'primary' : 'secondary'}
            >
              กระสุน
            </Button>
            <Button
              onClick={() => setTypePage('pll')}
              variant="contained"
              color={typePage === 'pll' ? 'primary' : 'secondary'}
            >
              ชิ้นส่วนซ่อม
            </Button>
            <Button
              onClick={() => setTypePage('target')}
              variant="contained"
              color={typePage === 'target' ? 'primary' : 'secondary'}
            >
              เป้า
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '10%' }} align="center">
                    วันที่ทำรายการ
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center">
                    เลขที่ใบเบิก
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center">
                    หน่วยที่เบิก
                  </TableCell>
                  <TableCell sx={{ width: '14%' }} align="center">
                    ผู้รับ
                  </TableCell>
                  <TableCell sx={{ width: '14%' }} align="center">
                    ผู้จ่าย
                  </TableCell>
                  <TableCell sx={{ width: '20%' }} align="center">
                    จำนวน
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center">
                    รายการที่เบิกรับ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSubBill.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">
                      {new Date(row.createdAt).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell align="center">{row.billName}</TableCell>
                    <TableCell align="center">{row.agencyName}</TableCell>
                    <TableCell align="center">{row.recipName}</TableCell>
                    <TableCell align="center">{row.payerName}</TableCell>
                    <TableCell align="center">{row.billQty}</TableCell>
                    <TableCell align="center">{row.listName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ marginTop: '20px' }}>
            <Pagination
              color="primary"
              count={subBillPageCount}
              onChange={handleChange}
              page={page}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('subBillStore')(observer(HistoryBill));
