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
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { reservationHistoryForUser } from "../data/test";
import SettingsIcon from "@mui/icons-material/Settings";
import "../css/RepairReport.css";
import Modal from "react-modal";
import { post, get } from "../../../api";
import { Header } from "./header";

export const Reservation = () => {
  //사용자 선택 가능한 목록 및 선택 가능한 서비스 목록
  const [userDevice, setUserDevice] = useState([]);
  const [repairShopServices, setRepairShopServices] = useState([]);

  //멤버 제외 이미지 크게 보기 모달
  const [imgViewModalState, setImgViewModalState] = useState(false);
  const [imgViewModalImgState, setImgViewModalImgState] = useState("");

  // for update
  const [isUpdate, setIsUpdate] = useState(
    window.location.href.includes("update")
  );

  const { reservationId } = useParams();
  const location = useLocation();
  const { repairShopId } = useParams();
  const finalRepairShopId = isUpdate
    ? repairShopId
    : location.state?.repairShopId;

  const shopId = useParams();

  //처음예약
  const rvRequestImageInput = useRef();

  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteImgState, setDeleteImgState] = useState("");

  //수정일 경우
  // const getUpdateData = () => {
  //   const getData = reservationHistoryForUser[0]; //axios로 받아온 데이터

  //   return {
  //     productName: getData.productName,
  //     services: getData.requestServices,
  //     requestComment: getData.requestComment,
  //     date: getData.date,
  //     time: getData.time,
  //     prodImg: getData.prodImg,
  //     rvRequestImgs: getData.rvRequestImgs,
  //     repairShopId: getData.repairShopId,
  //   };
  // };

  // // for update end

  // //transtmit data
  // const [reservationData, setReservationData] = useState(
  //   isUpdate
  //     ? getUpdateData()
  //     : {
  //         productName: "",
  //         services: [],
  //         comment: "",
  //         date: "",
  //         time: "",
  //         prodImg: "",
  //         rvRequestImgs: [],
  //         repairShopId: location.state?.repairShopId,
  //       }
  // );
  const getUpdateData = async () => {
    try {
      const res = await get(
        "http://localhost:8080/api/repair/reservation/history/detail",
        {
          params: { reservationId: reservationId },
        }
      );
      const getData = res.data;
      setRepairShopServices(getData.services);
      return {
        productName: getData.productName,
        services: getData.requestServices,
        requestComment: getData.requestComment,
        date: getData.date,
        time: getData.time,
        prodImg: getData.prodImg,
        //rvRequestImgs: getData.rvRequestImgs,
        rvRequestImgs: [],
        repairShopId: getData.repairShopId,
      };
    } catch (error) {
      // 에러 처리
      console.error(error);
      return null;
    }
  };

  // ...

  const [reservationData, setReservationData] = useState({
    productName: "",
    services: [],
    comment: "",
    date: "",
    time: "",
    prodImg: "",
    rvRequestImgs: [],
    repairShopId: location.state?.repairShopId,
  });

  useEffect(() => {
    if (isUpdate) {
      getUpdateData().then((data) => {
        if (data) {
          setReservationData(data);
        } else {
          // 데이터를 가져오지 못한 경우에 대한 처리
        }
      });
    }
  }, [isUpdate]);

  //completed
  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });

  const handleCompleted = () => {
    if (
      reservationData.productName === "" ||
      reservationData.services.length === 0 ||
      reservationData.date === "" ||
      reservationData.time === ""
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
    setReservationData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };

      const matchingItem = userDevice?.find(
        (item) => item.itName === e.target.value
      );
      if (matchingItem) {
        updatedData.prodImg = matchingItem.itImg;
      }

      return updatedData;
    });
  };
  const handleCommentData = (e) => {
    setReservationData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };

      updatedData.requestComment = e.target.value;

      return updatedData;
    });
  };
  const handleServicesButton = (e, value) => {
    setReservationData({ ...reservationData, services: value });
  };

  const handleDateSelect = (e) => {
    setReservationData({ ...reservationData, date: e.target.value });

    get("http://localhost:8080/api/repair/reservation/getEnableTime", {
      params: {
        repairShopId: finalRepairShopId,
        date: e.target.value,
      },
    })
      .then((res) => {
        setOpenedTime(res.data.reservationTimes);
        // 응답 처리
      })
      .catch((error) => {
        // 에러 처리
      });
    //for test
  };

  const handleTimeSelect = (e, value) => {
    setReservationData({ ...reservationData, time: value });
  };
  //transtmit data end

  //dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setReservationData({ ...reservationData, date: "", time: "" });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openedTime, setOpenedTime] = useState([]);

  //dialog end
  useEffect(() => {
    handleCompleted();
  }, [reservationData]);

  useEffect(() => {
    post("http://localhost:8080/api/repair/reservation/init", {
      repairShopId: location.state?.repairShopId,
    })
      .then((res) => {
        console.log(res);
        setUserDevice(res.data.myItems);
        setRepairShopServices(res.data.services);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickRvRequestImgPlus = () => {
    rvRequestImageInput.current.click();
  };
  const saveRvRequestImgFile = () => {
    if (
      rvRequestImageInput.current &&
      rvRequestImageInput.current.files.length > 0
    ) {
      const file = rvRequestImageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setReservationData({
          ...reservationData,
          rvRequestImgs: [...reservationData.rvRequestImgs, reader.result],
        });
      };
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
    },
  };
  const modalImgStyles = {
    maxWidth: "100%",
    objectFit: "cover",
    width: "100%",
  };

  const reservationImgContentByIsUpdate = () => {
    return (
      <>
        <Modal
          isOpen={deleteModalState}
          style={modalStyles}
          ariaHideApp={false}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              onClick={() => {
                setReservationData({
                  ...reservationData,
                  rvRequestImgs: reservationData.rvRequestImgs.filter(
                    (img) => img !== deleteImgState
                  ),
                });
                setDeleteModalState(false);
              }}
            >
              삭제
            </Button>
            <Button onClick={() => setDeleteModalState(false)}>취소</Button>
          </Box>
        </Modal>

        <Modal
          isOpen={imgViewModalState}
          style={modalStyles}
          ariaHideApp={false}
        >
          <img
            src={imgViewModalImgState}
            onClick={() => setImgViewModalState(false)}
            style={modalImgStyles}
            alt="requsetImg"
          />
        </Modal>
        <div className="img_common_field">
          {reservationData.rvRequestImgs.map((img, index) => (
            <div className="img_common_div" key={index}>
              <img
                className="img_content"
                src={img}
                alt="rvImgs"
                onClick={() => {
                  if (
                    JSON.parse(window.localStorage.getItem("user")).roleType ===
                    "MEMBER"
                  ) {
                    setDeleteModalState(true);
                    setDeleteImgState(img);
                  } else {
                    setImgViewModalState(true);
                    setImgViewModalImgState(img);
                  }
                }}
              />
            </div>
          ))}
          {JSON.parse(window.localStorage.getItem("user")).roleType ===
          "MEMBER" ? (
            <>
              <div className="img_common_div">
                <img
                  className="img_content"
                  src={process.env.PUBLIC_URL + "/plus.png"}
                  onClick={() => onClickRvRequestImgPlus()}
                  alt="add"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={rvRequestImageInput}
                onChange={saveRvRequestImgFile}
              />
            </>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <>
      {repairShopServices.length !== 0 ? (
        <>
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>예약 시간 선택</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <input
                  type="date"
                  value={reservationData.date}
                  onChange={handleDateSelect}
                  style={{ width: "80%" }}
                />
              </Box>
              {reservationData.date && (
                <ToggleButtonGroup
                  exclusive
                  value={reservationData.time}
                  onChange={handleTimeSelect}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {openedTime.map((time) => {
                    return (
                      <ToggleButton
                        key={time.time}
                        value={time.time}
                        disabled={!time.enable}
                        sx={{
                          flex: "0 0 auto",
                          whiteSpace: "nowrap",
                          border: "none",
                        }}
                      >
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
                disabled={
                  reservationData.date === "" || reservationData.time === ""
                }
                onClick={handleClose}
              >
                선택
              </Button>
            </DialogActions>
          </Dialog>

          <Header title={isUpdate ? "예약 수정" : "예약 신청"} />

          <Container sx={{ pt: "1%" }}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>제품 선택</InputLabel>
              <Select
                name="productName"
                value={reservationData.productName}
                defaultValue={""}
                onChange={handleData}
                label="제품 선택"
                fullWidth
              >
                {userDevice.map((item, index) => (
                  <MenuItem value={item.itName} key={index}>
                    {item.itName}
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
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: -10,
                  left: 10,
                  bgcolor: "white",
                  px: 1,
                  fontSize: "0.8rem",
                }}
              >
                제품 정보
              </Typography>
              <Box
                component="img"
                src={reservationData.prodImg ? reservationData.prodImg : null}
                sx={{
                  width: "40%",
                  height: "100%",
                  mr: "5%",
                  borderRadius: "10px",
                }}
              />
              <Typography>{reservationData.productName}</Typography>
            </Box>
            <ToggleButtonGroup
              value={reservationData.services}
              onChange={handleServicesButton}
              sx={{
                mt: "3%",
                width: "100%",
                border: "1px solid #C4C4C4",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {repairShopServices.map((service, index) => (
                <ToggleButton
                  key={index}
                  value={service}
                  sx={{
                    width: "100%",
                    height: "75px",
                  }}
                >
                  <SettingsIcon sx={{ fontSize: "40px" }} />

                  <Typography variant="h5">{service}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                border: "1px solid #C4C4C4",
                borderRadius: "4px",
                mt: "3%",
                padding: "3%",
                alignItems: "center",
              }}
              className="reservation_img_field"
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: -10,
                  left: 10,
                  bgcolor: "white",
                  px: 1,
                  fontSize: "0.8rem",
                }}
              >
                예약 제품 상태 이미지 등록
              </Typography>
              {reservationImgContentByIsUpdate()}
            </Box>
            <TextField
              name="comment"
              label="요청사항"
              value={reservationData.requestComment}
              onChange={handleCommentData}
              fullWidth
              multiline
              //rows={2}
              sx={{ mt: "3%" }}
            ></TextField>
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
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  방문 시간 선택
                </Typography>
                <Typography variant="body1">
                  {reservationData.date} {reservationData.time}
                </Typography>
              </Box>

              <Button variant="contained" sx={{}} onClick={handleOpen}>
                날짜/시간 선택
              </Button>
            </Box>

            <TitleButtonBar
              buttonLabel={isUpdate ? "수정" : "신청"}
              query={
                isUpdate
                  ? "http://localhost:8080/api/repair/reservation/update"
                  : "http://localhost:8080/api/repair/reservation/add"
              }
              transmitData={reservationData}
              completed={completed}
              reservationId={reservationId ? reservationId : null}
            />
          </Container>
        </>
      ) : null}
    </>
  );
};
