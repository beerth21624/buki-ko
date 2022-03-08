import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { observer, inject } from 'mobx-react';

const BillDetail = () => {
  return (
    <Layout>
      {' '}
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
            รายละเอียดการเบิกรับ
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <Typography>วันที่เบิกรับ: 1234</Typography>
          <Typography>เลขที่ใบเบิก: 1234</Typography>
          <Typography>หน่วยที่เบิก: 1234</Typography>
          <Typography>ผู้รับ: 1234</Typography>
          <Typography>ผู้จ่าย: 1234</Typography>
          <Typography>หมายเหตุ: 1234</Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('weaponStore')(observer(BillDetail));
