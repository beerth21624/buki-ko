import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import auth from '../../utilis/authen';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import ArticleIcon from '@mui/icons-material/Article';
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
  const router = useRouter();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = auth.getUserData();
    setUserRole(user?.role);
  }, []);
  console.log('role', userRole);
  const logout = () => {
    Swal.fire({
      title: 'ออกจากระะบบ?',
      text: 'คุณต้องการออกจากระบบใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOutAndClear();

        router.reload();
      }
    });
  };

  const validateRole = () => {
    Swal.fire('ไม่มีสิทธ์เข้าใช้', 'คุณต้องมีสิทธิ์ระดับจัดการขึ้นไป', 'error');
  };
  const validateRoleAdmin = () => {
    Swal.fire(
      'ไม่มีสิทธ์เข้าใช้',
      'คุณต้องมีสิทธิ์ระดับ Admin ขึ้นไป',
      'error'
    );
  };
  const developShow = () => {
    Swal.fire('อยู่ระหว่างการพัฒนา', 'แล้วพบกันใน version ถัดไป', 'warning');
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 65,
        backgroundColor: '#121828',
        width: '20vw',
        height: 'calc(100vh - 65px)',
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1px',
      }}
    >
      <hr style={{ width: '100%' }} />
      <Link href="/home">
        <CustomizeButton startIcon={<HomeIcon />}>
          <TextButton>หน้าแรก</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/weapon">
        <CustomizeButton startIcon={<AssignmentIcon />}>
          <TextButton>จัดการอาวุธปืน</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/ammunition">
        <CustomizeButton startIcon={<AssignmentIcon />}>
          <TextButton>จัดการกระสุน</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/pll">
        <CustomizeButton startIcon={<AssignmentIcon />}>
          <TextButton>จัดการชิ้นส่วนซ่อม</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/target">
        <CustomizeButton startIcon={<AssignmentIcon />}>
          <TextButton>จัดการรายการเป้า</TextButton>
        </CustomizeButton>
      </Link>
      {userRole !== 'ผู้ใช้' ? (
        <Link href="/bill/AddBill">
          <CustomizeButton startIcon={<AddIcon />}>
            <TextButton>เพิ่มรายการเบิก-ยืม สป.</TextButton>
          </CustomizeButton>
        </Link>
      ) : (
        <CustomizeButton onClick={() => validateRole()} startIcon={<AddIcon />}>
          <TextButton>เพิ่มรายการเบิก-ยืม สป.</TextButton>
        </CustomizeButton>
      )}
      <CustomizeButton
        onClick={() => developShow()}
        startIcon={<AssignmentReturnedIcon />}
      >
        <TextButton>จัดการส่งคืน สป.</TextButton>
      </CustomizeButton>
      <Link href="/doccument">
        <CustomizeButton startIcon={<ArticleIcon />}>
          <TextButton>เอกสารที่เกี่ยวข้อง</TextButton>
        </CustomizeButton>
      </Link>
      <Link href="/map">
        <CustomizeButton startIcon={<AddLocationIcon />}>
          <TextButton>วางแผนการรบ</TextButton>
        </CustomizeButton>
      </Link>
      <CustomizeButton
        onClick={() => developShow()}
        startIcon={<CleaningServicesIcon />}
      >
        <TextButton>บันทึกการทำความสะอาด</TextButton>
      </CustomizeButton>
      <Link href="/bill">
        <CustomizeButton startIcon={<HistoryIcon />}>
          <TextButton>ประวัติการเบิกยืม</TextButton>
        </CustomizeButton>
      </Link>

      <Link href="/historyBill">
        <CustomizeButton startIcon={<HistoryIcon />}>
          <TextButton>ประวัติการเบิกจ่าย</TextButton>
        </CustomizeButton>
      </Link>

      {userRole === 'admin' ? (
        <Link href="/UserManage">
          <CustomizeButton startIcon={<ManageAccountsIcon />}>
            <TextButton>จัดการผู้ใช้</TextButton>
          </CustomizeButton>
        </Link>
      ) : (
        <CustomizeButton
          onClick={() => validateRoleAdmin()}
          startIcon={<ManageAccountsIcon />}
        >
          <TextButton>จัดการผู้ใช้</TextButton>
        </CustomizeButton>
      )}
      <CustomizeButton onClick={() => logout()} startIcon={<LogoutIcon />}>
        <TextButton>ออกจากระบบ</TextButton>
      </CustomizeButton>

      <hr style={{ width: '100%' }} />
    </Box>
  );
};

export default Sidebar;
