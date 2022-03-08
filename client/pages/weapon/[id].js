import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { padding } from '@mui/system';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { observer, inject } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IMAGE_URL } from '../../config';
import CircularProgress from '@mui/material/CircularProgress';

const CustomizeInput = styled(TextField)`
  width: 60%;
`;
const FieldContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextInput = styled('p')`
  font-size: 16px;
  width: 120px;
`;
const TextArea = styled('textarea')`
  width: 60%;
  height: 120px;
`;
const CustomizeButton = styled(Button)`
  width: 200px;
  height: 40px;
`;
const CustomizeImg = styled(Button)`
  width: 30vw;
  height: 40vh;
`;
const Input = styled('input')({
  display: 'none',
});

const WeaponImage = styled('img')`
  width: 26vw;
  height: 150px;
`;
const WeaponUpdate = (props) => {
  const router = useRouter();
  const paramId = router.asPath.split('/')[2];
  const { Weapon } = props.weaponStore.toJS();
  const [gunName, setGunName] = useState(Weapon?.gunName);
  const [gunStatus, setGunStatus] = useState(Weapon?.gunStatus);
  const [gunNumber, setGunNumber] = useState(Weapon?.gunNumber);
  const [gunStore, setGunStore] = useState(Weapon?.gunStore);
  const [gunBill, setGunBill] = useState(Weapon?.gunBill);
  const [gunNote, setGunNote] = useState(Weapon?.gunNote);
  const [gunImage, setGunImage] = useState(Weapon?.gunImage);
  const [uploadImage, setUploadImage] = useState('');
  const [reloadPage, setReloadPage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resault = await props.weaponStore.getWeapon(paramId);

      setGunName(resault?.gunName);
      setGunNumber(resault?.gunNumber);
      setGunStatus(resault?.gunStatus);
      setGunStore(resault?.gunStore);
      setGunBill(resault?.gunBill);
      setGunImage(`${IMAGE_URL}${resault?.gunImage}`);
      setGunNote(resault?.gunNote);
      if (resault) setLoading(false);
    };
    fetchData();
  }, [paramId]);

  const handleChange = (event) => {
    setGunStatus(event.target.value);
  };

  const handleSaveImage = (e) => {
    console.log('image', gunImage);
    const filePic = e.target.files[0];
    setUploadImage(filePic);
    if (filePic) {
      const reader = new FileReader();
      reader.readAsDataURL(filePic);
      reader.onloadend = () => {
        setGunImage(reader.result);
      };
    }
  };
  const handleSubmit = (e) => {
    const httpNow = IMAGE_URL.split('/')[2];
    const checkHttpImage = gunImage.split('/')[2];

    function filterImage() {
      if (httpNow === checkHttpImage) {
        const spitImage = gunImage.split('/')[3];
        return spitImage;
      } else {
        return uploadImage;
      }
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('gunName', gunName);
    formData.append('gunStatus', gunStatus);
    formData.append('gunNumber', gunNumber);
    formData.append('gunStore', gunStore);
    formData.append('gunBill', gunBill);
    formData.append('gunNote', gunNote);
    formData.append('gunImage', filterImage());

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
        const success = props.weaponStore.updateWeapon(formData);
        if (success) {
          Swal.fire('สำเร็จ!', 'แก้ไขรายการเรียบร้อย', 'success');
          router.push('/weapon');
          props.weaponStore.setCreateSuccess();
        }
      }
    });
  };

  function deleteWeapon(number) {
    Swal.fire({
      title: 'ลบรายการ ?',
      text: 'คุณต้องการลบรายการใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.weaponStore.deleteWeapon(number);
        if (success) {
          Swal.fire('สำเร็จ!', 'ลบรายการเรียบร้อย', 'success');
          router.replace('/weapon');
          props.weaponStore.setCreateSuccess();
        }
      }
    });
  }
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
            paddingLeft: '15px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListAltIcon />
            <Typography sx={{ color: '#343434' }} variant="body1">
              แก้ไขรายการอาวุธปืน
            </Typography>
          </Box>
          <Button
            onClick={() => deleteWeapon(gunNumber)}
            color="error"
            size="small"
            variant="contained"
          >
            ลบรายการ
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', padding: '20px' }}>
              <Box
                component="label"
                sx={{
                  flexGrow: '2',
                  maxHeight: '90vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleSaveImage}
                />

                {gunImage ? (
                  <CustomizeImg
                    component="span"
                    sx={{
                      background: `url(${gunImage})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                    variant="outlined"
                  ></CustomizeImg>
                ) : (
                  <CustomizeImg component="span" variant="outlined">
                    เพิ่มรูปภาพ
                  </CustomizeImg>
                )}
              </Box>
              <Box sx={{ flexGrow: '1', maxHeight: '90vh' }}>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '30px',
                    gap: '10px',
                  }}
                >
                  <FieldContainer>
                    <TextInput>ชื่ออาวุธ</TextInput>
                    <CustomizeInput
                      defaultValue={gunName}
                      onChange={(e) => setGunName(e.target.value)}
                    />
                  </FieldContainer>
                  <FieldContainer>
                    <TextInput>หมายเลขปืน</TextInput>
                    <CustomizeInput
                      disabled
                      defaultValue={gunNumber}
                      onChange={(e) => setGunNumber(e.target.value)}
                    />
                  </FieldContainer>
                  <FieldContainer>
                    <TextInput>สถานที่จัดเก็บ</TextInput>
                    <CustomizeInput
                      defaultValue={gunStore}
                      onChange={(e) => setGunStore(e.target.value)}
                    />
                  </FieldContainer>
                  <FieldContainer>
                    <TextInput>ใบเบิก</TextInput>
                    <CustomizeInput
                      defaultValue={gunBill}
                      onChange={(e) => setGunBill(e.target.value)}
                    />
                  </FieldContainer>
                  <FieldContainer>
                    <TextInput>สถานะ</TextInput>
                    <Box sx={{ width: '60%' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          สถานะ
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gunStatus}
                          label="Status"
                          onChange={handleChange}
                        >
                          <MenuItem value={'พร้อมใช้งาน'}>พร้อมใช้งาน</MenuItem>
                          <MenuItem value={'ส่งซ่อม'}>ส่งซ่อม</MenuItem>
                          <MenuItem value={'รอส่งคืน'}>รอส่งคืน</MenuItem>
                          <MenuItem value={'เบิก-จ่าย'}>เบิก-จ่าย</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </FieldContainer>
                  <FieldContainer>
                    <TextInput>หมายเหตุ</TextInput>
                    <TextArea
                      defaultValue={gunNote}
                      onChange={(e) => setGunNote(e.target.value)}
                    ></TextArea>
                  </FieldContainer>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
            >
              <CustomizeButton
                color="success"
                variant="contained"
                onClick={handleSubmit}
              >
                บันทึก
              </CustomizeButton>
              <CustomizeButton href="/weapon" color="error" variant="contained">
                ยกเลิก
              </CustomizeButton>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default inject('weaponStore')(observer(WeaponUpdate));
