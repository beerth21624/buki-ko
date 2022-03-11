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
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import { observer, inject } from 'mobx-react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Bill = (props) => {
  const { allBill, billPageCount, allBillWeapon } = props.billStore.toJS();
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [allGun, setAllGun] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      const success = await props.billStore.getAllBill(page);
    };
    fetchData();
  }, [page]);
  const handleChange = (e, value) => {
    setPage(value);
  };
  console.log('data', allBill);

  const showDetail = async (id) => {
    setOpen(true);
    await props.billStore.getAllBillWeapon(id);
  };
  return (
    <Layout>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              รายการ สป. ที่เบิกรับ
            </Typography>
            {allBillWeapon.map((gun, index) => (
              <Box key={index} sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: '1' }}>
                  {index + 1}:{gun?.gunName}
                </Box>
                <Box sx={{ flexGrow: '1' }}>
                  หมายเลข &nbsp;{gun?.gunNumber}{' '}
                </Box>
              </Box>
            ))}
          </Box>
        </Modal>
      </div>
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
              รายการเบิก-ยืม
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
                    หมายเหตุ
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center">
                    รายการที่เบิกรับ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBill.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">
                      {new Date(row.createdAt).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell align="center">{row.billNumber}</TableCell>
                    <TableCell align="center">{row.agencyName}</TableCell>
                    <TableCell align="center">{row.nameRecipient}</TableCell>
                    <TableCell align="center">{row.nameApprover}</TableCell>
                    <TableCell align="center">{row.billNote}</TableCell>
                    <TableCell align="center">
                      {/* <Link href="/bill/BillDetail"> */}
                      <Button
                        variant="contained"
                        onClick={() => showDetail(row.billNumber)}
                      >
                        ดูรายละเอียด
                      </Button>
                      {/* </Link> */}
                    </TableCell>
                    {/* {setAllGun(row.Wea)} */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ marginTop: '20px' }}>
            <Pagination
              onChange={handleChange}
              page={page}
              color="primary"
              count={billPageCount}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('billStore')(observer(Bill));
