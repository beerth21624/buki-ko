import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../../component/layout/Layout';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { borderRadius, padding } from '@mui/system';
import { observer, inject } from 'mobx-react';
import { IMAGE_URL } from '../../config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Router from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const CustomizeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  width: 23%;
  height: 360px;
  border-radius: 10px;
  box-shadow: 0px 5px 33px -15px rgba(0, 0, 0, 0.49);
  gap: 10px;
`;
const CustomizeImg = styled(Paper)`
  width: 100%;
  height: 170px;
`;

const Weapon = (props) => {
  const { allWeapon, weaponPageCount, createSuccess } =
    props.weaponStore.toJS();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [updataShow, setUpdataShow] = useState(true);
  const [paginationStart, setPaginationStart] = useState(false);
  const [pageStatus, setPageStatus] = useState('');
  const [loadding, setLoading] = useState('false');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (pageStatus !== '') {
        await props.weaponStore.getAllWeapon(page, pageStatus, '');
      } else {
        await props.weaponStore.getAllWeapon(page, '', '');
      }
      setPaginationStart(false);
      setLoading(false);
    };
    fetchData();
  }, [page, updataShow, createSuccess, pageStatus]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const filterStatus = (type) => {
    let output = allWeapon;
    if (searchText === '') {
      setUpdataShow(!updataShow);
      setPaginationStart(false);
    }

    if (searchText) {
      props.weaponStore.getAllWeapon(page, '', searchText);
    }
    props.weaponStore.setAllWeapon(output);
  };
  const checkEnterKey = (event) => {
    if (event === 'Enter') {
      filterStatus();
    }
  };
  const setWeaponStatus = async (status) => {
    setPage(1);
    const resault = await props.weaponStore.getAllWeapon(1, status);
    setPageStatus(status);
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
              รายการอาวุธปืน
            </Typography>
          </Box>
          <Link href="/weapon/AddWeapon">
            <Button size="small" variant="contained">
              เพิ่มรายการอาวุธ
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            padding: '20px',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <Typography>ค้นหา ตามหมายเลขปืน</Typography>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => checkEnterKey(e.key)}
          />
          <Button
            color="success"
            variant="contained"
            sx={{ marginRight: '20px' }}
            onClick={() => filterStatus()}
          >
            ค้นหา
          </Button>
          <Button
            onClick={() => setWeaponStatus('')}
            color={pageStatus === '' ? 'primary' : 'secondary'}
            variant="contained"
          >
            ทั้งหมด
          </Button>
          <Button
            onClick={() => setWeaponStatus('พร้อมใช้งาน')}
            color={pageStatus === 'พร้อมใช้งาน' ? 'primary' : 'secondary'}
            variant="contained"
          >
            พร้อมใช้งาน
          </Button>
          <Button
            onClick={() => setWeaponStatus('ส่งซ่อม')}
            color={pageStatus === 'ส่งซ่อม' ? 'primary' : 'secondary'}
            variant="contained"
          >
            ส่งซ่อม
          </Button>
          <Button
            onClick={() => setWeaponStatus('รอส่งคืน')}
            color={pageStatus === 'รอส่งคืน' ? 'primary' : 'secondary'}
            variant="contained"
          >
            รอส่งคืน
          </Button>
          <Button
            onClick={() => setWeaponStatus('เบิก-จ่าย')}
            color={pageStatus === 'เบิก-จ่าย' ? 'primary' : 'secondary'}
            variant="contained"
          >
            เบิก-จ่าย
          </Button>
        </Box>
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
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {allWeapon.map((gun, index) => (
                <CustomizeContainer key={index}>
                  <CustomizeImg
                    sx={{
                      background: `url(${IMAGE_URL}${gun.gunImage})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0 15px',
                    }}
                  >
                    {/* /////////// */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography variant="h6">
                        {gun.gunName.toUpperCase()}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        {gun.gunStatus === 'พร้อมใช้งาน' ? (
                          <Box
                            sx={{
                              backgroundColor: 'green',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                            }}
                          ></Box>
                        ) : (
                          <Box
                            sx={{
                              backgroundColor: 'red',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                            }}
                          ></Box>
                        )}

                        <Typography>{gun.gunStatus}</Typography>
                      </Box>
                    </Box>
                    {/* /////////// */}
                    <Typography>หมายเลขปืน: {gun.gunNumber}</Typography>
                    <Typography>สถานที่จัดเก็บ: {gun.gunStore}</Typography>
                    <Typography>ใบเบิก: {gun.gunBill}</Typography>
                    <Typography>หมายเหตุ: {gun.gunNote}</Typography>
                    <Link href={`/weapon/${gun.gunNumber}`}>
                      <Button variant="contained">แก้ไขรายละเอียด</Button>
                    </Link>
                  </Box>
                </CustomizeContainer>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <Stack spacing={2}>
                {paginationStart ? (
                  <Pagination
                    onChange={handleChange}
                    page={page}
                    color="primary"
                    shape="rounded"
                  />
                ) : (
                  <Pagination
                    page={page}
                    count={weaponPageCount}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                  />
                )}
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default inject('weaponStore')(observer(Weapon));
