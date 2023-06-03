import { useState, useEffect } from "react";
import { reservationHistoryForUser } from "../data/test";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { Box, Button, Container, Grid, Typography, Card } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Modal from "react-modal";
import { get, post } from "../../../api";
import palette from "../../../theme/palette";
import { Header } from "./header";
import { BaseUrl } from "../../../api/BaseUrl";

export const ReservationHistoryDetail = () => {
  const { reservationId } = useParams();
  const [data, setData] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const [imgViewModalState, setImgViewModalState] = useState(false);
  const [imgViewModalImgState, setImgViewModalImgState] = useState("");

  useEffect(() => {
    get(BaseUrl + "/api/repair/reservation/history/detail", {
      params: { reservationId: reservationId },
    })
      .then((res) => setData(res.data))
      .catch((error) => {
        // 에러 처리
      });
  }, []);

  const handleAccept = () => {
    // 예약 수락
    post(BaseUrl + "/api/repair/reservation/accept", {
      reservationId: reservationId,
    })
      .then((res) => {
        console.log(res);
        if (res.data === false) {
          alert("사용자의 포인트가 부족합니다.");
          return;
        }
        alert("예약이 수락되었습니다.");
        //navigate("/repair/reservation/history");
        navigate(-1);
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  const handleReject = () => {
    // 예약 거절
    post(BaseUrl + "/api/repair/reservation/reject", {
      reservationId: reservationId,
    })
      .then((res) => {
        console.log(res);
        alert("예약이 거절되었습니다.");
        //navigate("/repair/reservation/history");
        navigate(-1);
      })
      .catch((error) => {
        // 에러 처리
      });
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
  return (
    <>
      {data ? (
        <>
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
          <Header />
          <Container
            sx={{
              pt: "1%",
              mt: 2,
            }}
          >
            <Card
              sx={{
                mt: 2,
                mb: 2,
                boxShadow: 10,
              }}
            >
              <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                제품정보
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  width: "100%",
                  height: "100px",
                  borderRadius: "4px",
                  mt: "3%",
                  padding: "3%",
                  alignItems: "center",
                }}
              >
                {data.prodImg ? (
                  <Box
                    component="img"
                    src={data.prodImg}
                    alt={data.productName}
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
                    }}
                  ></Box>
                )}
                <Typography>{data.productName}</Typography>
              </Box>
            </Card>

            <Card
              sx={{
                mt: 2,
                mb: 2,
                boxShadow: 10,
              }}
            >
              <Grid
                container
                direction="column"
                alignContent={"flex-start"}
                sx={{
                  borderBottom: "1px dashed #C4C4C4",
                  mb: "3%",
                  pb: "3%",
                }}
              >
                {" "}
                <Typography
                  variant="h6"
                  sx={{ color: "GrayText", ml: 2, mt: 1 }}
                >
                  신청정보
                </Typography>
              </Grid>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  minHeight: "100px",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignContent={"flex-start"}
                  sx={{
                    borderBottom: "1px dashed #C4C4C4",
                    mb: "3%",
                    pb: "3%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "GrayText", ml: 2, mb: 1 }}
                  >
                    신청 서비스
                  </Typography>
                  {data.requestServices.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          width: "100%",
                          border: "1px solid #f1f1f1",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          pt: 1,
                          pb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            borderBottom: "2px solid #f1f1f1",
                            pb: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h5">
                            {item.serviceName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ color: palette.error.main, mt: 0.5 }}
                          >
                            ITEM 특가
                          </Typography>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 800 }}
                            >
                              {item.price.toLocaleString()}원
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Grid>

                <Box
                  variant="body1"
                  sx={{
                    width: "100%",
                    flex: "1 0 auto",
                    mt: "1%",
                    borderBottom: "1px dashed #A4A4A4",
                    mb: "3%",
                    pb: "3%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "GrayText", ml: 2 }}
                  >
                    이미지
                  </Typography>
                  <div className="reservation_img_field">
                    <div className="img_common_field">
                      {data.rvRequestImgs.map((img, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: "200px",
                            margin: "0 auto",
                            display: "table-cell",
                            verticalAlign: "middle",
                          }}
                        >
                          <Box
                            component="img"
                            src={img}
                            alt="rvImgs"
                            sx={{
                              border: "1px solid #f1f1f1",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              top: "0px",
                              bottom: "0px",
                              maxWidth: "180px",
                              maxHeight: "180px",
                              my: 1,
                            }}
                            onClick={() => {
                              setImgViewModalState(true);
                              setImgViewModalImgState(img);
                            }}
                          />
                        </Box>
                      ))}
                    </div>
                  </div>
                </Box>

                <Box
                  variant="body1"
                  sx={{
                    width: "100%",
                    flex: "1 0 auto",
                    borderBottom: "1px dashed #A4A4A4",
                    mt: "1%",
                    mb: "3%",
                    pb: "3%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "GrayText", ml: 2 }}
                  >
                    요청 사항
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "100%",
                      flex: "1 0 auto",
                      mt: "1%",
                      mb: "3%",
                      pb: "3%",
                      ml: 2,
                    }}
                  >
                    {data.requestComment}
                  </Typography>
                </Box>
                <Box
                  variant="body1"
                  sx={{
                    width: "100%",
                    flex: "1 0 auto",
                    mt: "1%",
                    mb: "3%",
                    pb: "3%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "GrayText", ml: 2 }}
                  >
                    예약 시간
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      flex: "1 0 auto",
                      mt: "1%",
                      color: "GrayText",
                      textAlign: "center",
                    }}
                  >
                    {data.date} {data.time}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {JSON.parse(window.localStorage.getItem("user")) !== null ? (
              JSON.parse(window.localStorage.getItem("user")).roleType ===
                "MECHANIC" && data.status === "예약 대기" ? (
                <Card
                  sx={{
                    mt: 2,
                    mb: 2,
                    boxShadow: 10,
                    pt: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "GrayText", ml: 2 }}>
                    예약 처리
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      height: "100px",
                      mt: "3%",
                      padding: "3%",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleReject();
                      }}
                      sx={{
                        width: "40%",
                        height: "80%",
                      }}
                    >
                      거절
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleAccept();
                      }}
                      sx={{ width: "40%", height: "80%" }}
                    >
                      수락
                    </Button>
                  </Box>
                </Card>
              ) : null
            ) : null}
          </Container>
        </>
      ) : null}
    </>
  );
};
