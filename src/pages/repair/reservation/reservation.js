import {
  Autocomplete,
  FormControl,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  InputLabel,
} from "@mui/material";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  testServiceTime,
  services,
  products,
  reservationHistoryForUser,
} from "../data/test";
import SettingsIcon from "@mui/icons-material/Settings";

export const Reservation = () => {
  // for update
  const [isUpdate, setIsUpdate] = useState(
    window.location.href.includes("update")
  );

  const getUpdateData = () => {
    const getData = reservationHistoryForUser[0];
    return {
      userId: getData.uid,
      repairId: shopId,
      product: getData.product,
      services: getData.service,
      comment: getData.userComment,
      date: getData.date,
      time: getData.time,
    };
  };

  // for update end

  const shopId = useParams();
  const [productImg, setProductImg] = useState("");

  //transtmit data
  const [data, setData] = useState(
    isUpdate
      ? getUpdateData()
      : {
          userId: 0,
          repairId: shopId,
          product: 0,
          services: [],
          comment: "",
          date: "",
          time: "",
        }
  );
  //completed
  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });
  const handleCompleted = () => {
    if (
      data.product === "" ||
      data.services.length === 0 ||
      data.date === "" ||
      data.time === ""
    ) {
      setCompleted({
        isCompleted: false,
        msg: "필수 정보를 모두 입력해주세요.",
      });
    } else {
      setCompleted({
        isCompleted: true,
        msg: "",
      });
    }
  };

  //completed end
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleServicesButton = (e, value) => {
    setData({ ...data, services: value });
  };
  const handleDateSelect = (e) => {
    setData({ ...data, date: e.target.value });
    //for test
    setOpenedTime(testServiceTime);
  };

  const handleTimeSelect = (e, value) => {
    setData({ ...data, time: value });
  };
  //transtmit data end

  //dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setData({ ...data, date: "", time: "" });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openedTime, setOpenedTime] = useState([]);

  //dialog end
  useEffect(
    (data) => {
      handleCompleted();
    },
    [data]
  );

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>예약 시간 선택</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <input
              type="date"
              value={data.date}
              onChange={handleDateSelect}
              style={{ width: "80%" }}
            />
          </Box>
          {data.date && (
            <ToggleButtonGroup
              exclusive
              value={data.time}
              onChange={handleTimeSelect}>
              {openedTime.map((time) => {
                return (
                  <ToggleButton
                    key={time.time}
                    value={time.time}
                    disabled={!time.isEnable}>
                    {time.time}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button
            variant="outlined"
            disabled={data.date === "" || data.time === ""}
            onClick={handleClose}>
            선택
          </Button>
        </DialogActions>
      </Dialog>

      <TitleButtonBar
        title={isUpdate ? "예약 수정" : "예약 신청"}
        buttonLabel={isUpdate ? "수정" : "신청"}
        query={isUpdate ? "query - update" : "query - new"}
        transmitData={data}
        completed={completed}
      />
      <Container sx={{ mt: "56px", pt: "1%" }}>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>제품 선택</InputLabel>
          <Select
            name="product"
            value={data.product}
            defaultValue={data.product}
            onChange={handleData}
            label="제품 선택"
            fullWidth>
            {products.map((product, index) => (
              <MenuItem value={product.id} key={index}>
                {product.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100px",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            mt: "3%",
            padding: "3%",
            alignItems: "center",
          }}>
          <Typography
            sx={{
              position: "absolute",
              top: -10,
              left: 10,
              bgcolor: "white",
              px: 1,
              fontSize: "0.8rem",
            }}>
            제품정보
          </Typography>
          {productImg ? (
            <Box
              component="img"
              src={productImg}
              alt={data.product}
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                bgcolor: "#8C92AC",
                borderRadius: "10px",
              }}></Box>
          )}
          <Typography>
            {products.map(
              (product) => product.id === data.product && product.title
            )}
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={data.services}
          onChange={handleServicesButton}
          sx={{
            mt: "3%",
            width: "100%",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
          }}>
          {services.map((service) => (
            <ToggleButton
              key={service.id}
              value={service.title}
              sx={{
                width: "100%",
                height: "75px",
              }}>
              <SettingsIcon sx={{ fontSize: "40px" }} />
              <Typography variant="h5">{service.title}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <TextField
          name="comment"
          label="요청사항"
          value={data.comment}
          onChange={handleData}
          fullWidth
          multiline
          rows={2}
          sx={{ mt: "3%" }}></TextField>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "3%",
            padding: "3%",
            width: "100%",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            height: "100px",
          }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              방문 시간 선택
            </Typography>
            <Typography variant="body1">
              {data.date} {data.time}
            </Typography>
          </Box>

          <Button variant="contained" sx={{}} onClick={handleOpen}>
            날짜/시간 선택
          </Button>
        </Box>
      </Container>
    </>
  );
};
