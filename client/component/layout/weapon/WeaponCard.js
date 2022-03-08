import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { borderRadius, padding } from '@mui/system';
const CustomizeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 260px;
  width: 22%;
  height: 340px;
  border-radius: 10px;
  box-shadow: 0px 5px 33px -15px rgba(0, 0, 0, 0.49);
  gap: 10px;
`;
const CustomizeImg = styled(Paper)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 170px;
`;
const WeaponCard = ({
  gunImage,
  gunName,
  gunStatus,
  gunNumber,
  gunStore,
  gunNote,
}) => {
  //   const { gunImage, gunName, gunStatus, gunNumber, gunStore, gunNote } = props;
  console.log(gunImage);

  return (
    <CustomizeContainer>
      <Box
        sx={{
          backgroundImage: ``,
          backgroundPosition: 'center',
          width: '100%',
          height: '170px',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 15px' }}>
        {/* /////////// */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Typography variant="h6">M16A4</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {}
            <Box
              sx={{
                backgroundColor: 'green',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
              }}
            ></Box>
            <Typography>พร้อมใช้งาน</Typography>
          </Box>
        </Box>
        {/* /////////// */}
        {/* <Typography>หมายเลขปืน: {gunNumber}</Typography>
        <Typography>สถานที่จัดเก็บ: {gunStore}</Typography>
        <Typography>หมายเหตุ: {gunStore}</Typography> */}
        <Button variant="contained">ดูรายละเอียด</Button>
      </Box>
    </CustomizeContainer>
  );
};

export default WeaponCard;
