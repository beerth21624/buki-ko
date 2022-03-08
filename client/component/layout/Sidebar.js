import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const CustomizeButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.08);
  height: 50px;
  justify-content: flex-start;
  padding-left: 20px;
`;
const TextButton = styled('p')`
  color: white;
  font-size: 16px;
`;

const Sidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#121828',
        width: '20vw',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 0 0 0',
        gap: '1px',
      }}
    >
      <hr style={{ width: '100%', marginBottom: '40px' }} />
      <Link href="/home">
        <CustomizeButton>
          <TextButton>หน้าแรก</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/weapon">
        <CustomizeButton>
          <TextButton>จัดการอาวุธปืน</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/ammunition">
        <CustomizeButton>
          <TextButton>จัดการกระสุน</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/pll">
        <CustomizeButton>
          <TextButton>จัดการชิ้นส่วนซ่อม</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/target">
        <CustomizeButton>
          <TextButton>จัดการรายการเป้า</TextButton>
        </CustomizeButton>
      </Link>

      <Link href="/bill">
        <CustomizeButton>
          <TextButton>จัดการรายการเบิก-ยืม สป.</TextButton>
        </CustomizeButton>
      </Link>

      <Link href="/bill">
        <CustomizeButton>
          <TextButton>จัดการรายการจ่าย สป.</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/UserManage">
        <CustomizeButton>
          <TextButton>จัดการผู้ใช้</TextButton>
        </CustomizeButton>
      </Link>
      <hr style={{ width: '100%', marginTop: '40px' }} />
    </Box>
  );
};

export default Sidebar;
