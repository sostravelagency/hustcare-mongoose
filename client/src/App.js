import { Routes, Route } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import {
  Home,
  Login,
  Rental,
  Contact,
  HomePage,
  DetailPost,
  SearchDetail,
  LikeList,
  ForgotPassword,
} from "./containers/Public";
import { path } from "./ultils/constant";
import {
  System,
  CreatePost,
  ManagePost,
  EditAccount,
  ChangePassword,
  ManageUser,
  ManagePostAdmin,
} from "./containers/System";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { io } from 'socket.io-client';
import instance from "./axiosConfig";
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();
export const AppContext = createContext()
function App() {
  const [open, setOpen] = React.useState(false);
  const [dataBooking, setDataBooking] = useState({})
  const [socket, setSocket] = useState()
  const [userId, setUserId] = useState()
  const [open2, setOpen2] = useState(false)
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);
  useEffect(() => {
    const socketI = io("http://localhost:5000", { transports: ['websocket'] })
    socketI.emit("user", { token })
    setSocket(socketI)
  }, [token])

  useEffect(() => {
    if (socket) {
      socket.on("userId", data => {
        setUserId(data)
      })
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on("receive_booking", data => {
        if (data.data.userId === userId) {
          console.log(data)
          console.log(data.id, userId)
          setOpen(true)
          setDataBooking(data)
        }
      })
    }
  }, [socket, userId])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const action = (
    <React.Fragment>
      <Button onClick={() => {
        setOpen2(true)
      }} color="secondary" size="small">
        Xem chi tiết
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <AppContext.Provider value={{ socket, userId }}>
      <div className="w-screen overflow-hidden overflow-x-hidden bg-primary">
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path={path.HOME} element={<Home />}>
              <Route path={path.LOGIN} element={<Login />} />
              <Route path="*" element={<HomePage />} />
              <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
              <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
              <Route path={path.CHO_THUE_NHA} element={<Rental />} />
              <Route path={path.SEARCH} element={<SearchDetail />} />
              <Route path={path.HUONG_DAN_SU_DUNG} element={<Contact />} />
              <Route
                path={path.DETAIL_POST__TITLE__POSTID}
                element={<DetailPost />}
              />
              <Route path={path.POST_LIKE} element={<LikeList />} />
              <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
            </Route>
            <Route path={path.SYSTEM} element={<System />}>
              <Route path={path.CREATE_PORST} element={<CreatePost />}></Route>
              <Route path={path.MANAGE_PORST} element={<ManagePost />}></Route>
              <Route path={path.EDIT_ACCOUNT} element={<EditAccount />}></Route>
              <Route
                path={path.CHANGE_PASSWORD}
                element={<ChangePassword />}
              ></Route>
              <Route path={path.CREATE_PORST} element={<CreatePost />}></Route>
              <Route path={path.MANAGE_USER_ADMIN} element={<ManageUser />}></Route>
              <Route
                path={path.MANAGE_POST_ADMIN}
                element={<ManagePostAdmin />}
              ></Route>
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </ThemeProvider>
      </div>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false)
          }}
          message="Có người hẹn xem phòng"
          action={action}
        />
      </div>
      <Dialog
        open={open2}
        onClose={()=> {
          setOpen2(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Chi tiết"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "12px 0",
                gap: 20,
              }}
            >
              <div>Họ tên:</div>
              <TextField
                value={dataBooking?.data?.name}
                disabled
                style={{ width: 300, height: 40, margin: "12px 0" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "12px 0",
                gap: 20,
              }}
            >
              <div>Số điện thoại:</div>
              <TextField
                value={dataBooking?.data?.phone}
                disabled
                style={{ width: 300, height: 40, margin: "12px 0" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "12px 0",
                gap: 20,
              }}
            >
              <div>Ngày xem:</div>
              <TextField
                value={dataBooking?.data?.value}
                disabled
                style={{ width: 300, height: 40, margin: "12px 0" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "12px 0",
                gap: 20,
              }}
            >
              <div>Giờ xem:</div>
              <TextField
                value={dataBooking?.data?.value1}
                disabled
                style={{ width: 300, height: 40, margin: "12px 0" }}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen2(false)
          }}>Đóng</Button>
        </DialogActions>
      </Dialog>

    </AppContext.Provider>
  );
}

export default App;
