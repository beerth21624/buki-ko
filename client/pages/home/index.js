import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { observer, inject } from 'mobx-react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Home = (props) => {
  const router = useRouter();
  const { todoData } = props.todoStore.toJS();
  const { weaponCountData, ammuCountData } = props.homeStore.toJS();
  const [openTodo, setOpenTodo] = React.useState(false);
  const [allGun, setAllGun] = useState(false);

  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await props.todoStore.getAllTodo();
      await props.homeStore.getCountWeapon();
      await props.homeStore.getCountAmmu();
    };
    fetchData();
  }, []);
  const handleChange = (e, value) => {
    setPage(value);
  };

  const handleSaveTodo = () => {
    Swal.fire({
      title: 'บันทึกรายการ?',
      text: 'คุณต้องการบันทึกรายการใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenTodo(false);
        const success = props.todoStore.createTodo(todoTitle, todoDesc);
        if (success) {
          Swal.fire('สำเร็จ!', 'บันทึกรายการเรียบร้อย', 'success');
          router.reload();
        }
      }
    });
  };
  const handleDeleteTodo = (id) => {
    Swal.fire({
      title: 'ลบรายการ?',
      text: 'คุณต้องการลบรายการใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const success = props.todoStore.deleteTodo(id);
        if (success) {
          Swal.fire('สำเร็จ!', 'ลบรายการเรียบร้อย', 'success');
          router.reload();
        }
      }
    });
  };

  const pageWeapon = () => {
    router.push('/weapon');
  };
  const pageAmmu = () => {
    router.push('/ammunition');
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
              หน้าแรก
            </Typography>
          </Box>
          {/* <Link href="/bill/AddBill">
            <Button size="small" variant="contained">
              เพิ่มรายการเบิกยืม
            </Button>
          </Link> */}
        </Box>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  padding: '20px 0 20px 20px',
                }}
              >
                <Card sx={{ width: '100%' }}>
                  <CardActionArea onClick={() => pageWeapon()}>
                    <CardMedia
                      component="img"
                      height="300"
                      image="image/p01.jpeg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        รายงานอาวุธปืน
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>จำนวนปืนทั้งหมด: </div>
                        <div> {weaponCountData.all} กระบอก</div>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>จำนวนปืนพร้อมใช้งาน:</div>
                        <div>{weaponCountData.ready} กระบอก</div>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div> จำนวนปืนส่งซ่อม:</div>
                        <div>{weaponCountData.fix} กระบอก</div>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>จำนวนปืนรอส่งคืน:</div>
                        <div>{weaponCountData.out} กระบอก</div>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>จำนวนปืนเบิก-จ่าย:</div>
                        <div> {weaponCountData.bill} กระบอก</div>
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '20px',
                          color: 'gray',
                        }}
                      >
                        <Typography>คลิกเพื่อดูรายละเอียดเพิ่มเติม</Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  padding: '20px 20px 20px 0',
                }}
              >
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Card sx={{ width: '100%', alignItems: 'flex-start' }}>
                    <CardActionArea onClick={() => pageAmmu()}>
                      <CardMedia
                        component="img"
                        height="300"
                        image="image/p02.jpeg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          รายงานกระสุน
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>กระสุนคงเหลือทั้งหมด</div>
                          <div> {ammuCountData} นัด</div>
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginTop: '20px',
                            color: 'gray',
                            bottom: '5px',
                            height: '143px',
                          }}
                        >
                          <Typography>
                            คลิกเพื่อดูรายละเอียดเพิ่มเติม
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '30%',
              // backgroundColor: '#E7E7E7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              gap: '5px',
              // borderLeft: '2px solid #E7E7E7',
              minHeight: '82vh',
              overflow: 'scroll',
            }}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">รายการภารกิจทั้งหมด</Alert>
            </Stack>
            {/* <Typography variant="h5">ภารกิจวันนี้</Typography> */}
            {todoData.map((todo) => (
              <Card
                sx={{
                  minWidth: 275,
                  position: 'relative',
                  borderLeft: '5px solid lightGrey',
                }}
              >
                <HighlightOffIcon
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{
                    position: 'absolute',
                    right: '3px',
                    top: '3px',
                    cursor: 'pointer',
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{todo.todoTitle}.</Typography>
                  <Typography variant="body2">{todo.todoDesc}</Typography>
                </CardContent>
                {/* <CardActions>
                  <Button color="error" size="small">
                    ลบรายการ
                  </Button>
                </CardActions> */}
              </Card>
            ))}
            {!openTodo && (
              <Button
                onClick={() => setOpenTodo(true)}
                sx={{ width: '90%' }}
                variant="outlined"
              >
                เพิ่มรายการ
              </Button>
            )}
            {openTodo && (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <input
                    style={{
                      width: '100%',
                      height: '30px',
                      borderStyle: 'solid',
                      borderColor: ' #e7e7e7',
                    }}
                    onChange={(e) => setTodoTitle(e.target.value)}
                  />
                  <textarea
                    onChange={(e) => setTodoDesc(e.target.value)}
                    style={{
                      width: '100%',
                      height: '60px',
                      marginTop: '3px',
                      borderColor: ' #e7e7e7',
                    }}
                  ></textarea>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => handleSaveTodo()}
                    color="success"
                    size="small"
                    variant="contained"
                  >
                    บันทึก
                  </Button>
                  <Button
                    onClick={() => setOpenTodo(false)}
                    color="error"
                    size="small"
                    variant="contained"
                  >
                    ยกเลิก
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default inject('todoStore', 'homeStore')(observer(Home));
