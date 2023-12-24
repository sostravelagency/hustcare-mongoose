import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import swal from "sweetalert";
import { AppContext } from "../App";

export default function BookingPopup(props) {
  const { socket, userId }= React.useContext(AppContext)
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [value1, setValue1] = React.useState(dayjs("2022-04-17"));
  const handleClose = () => {
    props?.setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <Dialog
          open={props?.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Hẹn xem phòng"}</DialogTitle>
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
                <div>Chọn ngày:</div>

                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Chọn ngày"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    style={{ width: 300 }}
                  />
                </DemoContainer>
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
                <div>Chọn giờ xem:</div>

                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <TimePicker
                    label="Chọn giờ"
                    value={value1}
                    onChange={(newValue) => setValue1(newValue)}
                    style={{ width: 300 }}
                  />
                </DemoContainer>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button
              onClick={() => {
                const data = {
                  name,
                  phone,
                  value: value.format("DD/MM/YYYY"),
                  value1: value1.format("HH:mm"),
                  userId: props?.user?.id
                };
                socket.emit("push_booking", {data})
                console.log(data)
                swal(
                  "Thông báo",
                  "Đặt lịch xem phòng thành công",
                  "success"
                ).then(() => handleClose());
              }}
              autoFocus
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </LocalizationProvider>
  );
}
