import { useEffect, useState } from "react";
import { estimateHistoryForRepair, estimateHistoryForUser } from "../data/test";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";

export const EstimateHistoryDetail = ({ role }) => {
  const location = useLocation();

  const [data, setData] = useState(
    location.state?.role === "user"
      ? estimateHistoryForUser[0] // user, waiting
      : // estimateHistoryForUser[1] // user, complete
        estimateHistoryForRepair[0] // repair, waiting
    // estimateHistoryForRepair[1] // repair, complete
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdate = () => {
    setIsUpdating(true);
  };
  const [formData, setFormData] = useState({
    repairComment: "",
    minPrice: 0,
    maxPrice: 0,
    minTime: 0,
    maxTime: 1,
  });

  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });
  // const handleCompleted = () => {
  //   if (
  //     formData.repairComment !== "" &&
  //     formData.maxPrice !== 0 &&
  //     formData.minTime <= formData.maxTime
  //   ) {
  //     if (formData.maxPrice < formData.minPrice) {
  //       setCompleted({
  //         isCompleted: false,
  //         msg: "최소 금액이 최대 금액보다 큽니다.",
  //       });
  //     } else if (formData.minTime > formData.maxTime) {
  //       setCompleted({
  //         isCompleted: false,
  //         msg: "최소 시간이 최대 시간보다 큽니다.",
  //       });
  //     } else {
  //       setCompleted({
  //         isCompleted: true,
  //         msg: "",
  //       });
  //     }
  //   } else {
  //     setCompleted({
  //       isCompleted: false,
  //       msg: "필수 정보를 모두 입력해주세요.",
  //     });
  //   }

  //   console.log(formData);
  //   console.log(completed);
  // };

  const handleCompleted = () => {
    if (formData.repairComment !== "" && formData.maxPrice !== 0) {
      if (formData.maxPrice < formData.minPrice) {
        setCompleted({
          isCompleted: false,
          msg: "최소 금액이 최대 금액보다 큽니다.",
        });
      } else if (formData.minTime > formData.maxTime) {
        setCompleted({
          isCompleted: false,
          msg: "최소 시간이 최대 시간보다 큽니다.",
        });
      } else {
        setCompleted({
          isCompleted: true,
          msg: "",
        });
      }
    } else {
      setCompleted({
        isCompleted: false,
        msg: "필수 정보를 모두 입력해주세요.",
      });
    }
    console.log(formData);
    console.log(completed);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    handleFormData(e);
  };
  useEffect(() => {
    handleCompleted();
  }, [formData]);

  const timeList = [
    {
      value: 0,
      label: "0시간",
    },
    {
      value: 1,
      label: "1시간",
    },
    {
      value: 2,
      label: "2시간",
    },
    {
      value: 3,
      label: "3시간",
    },
    {
      value: 4,
      label: "4시간",
    },
    {
      value: 5,
      label: "5시간",
    },
    {
      value: 6,
      label: "6시간",
    },
    {
      value: 7,
      label: "7시간",
    },
    {
      value: 8,
      label: "8시간",
    },
    {
      value: 9,
      label: "9시간",
    },
    {
      value: 10,
      label: "10시간",
    },
    {
      value: 11,
      label: "11시간",
    },
    {
      value: 12,
      label: "12시간",
    },
  ];

  return (
    <>
      <TitleButtonBar
        title="견적 내역"
        buttonLabel={isUpdating ? "등록" : null}
        query={""}
        transmitData={formData}
        completed={completed}
      />
      <Container
        sx={{
          mt: "56px",
          pt: "1%",
        }}
      >
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
            제품정보
          </Typography>
          {data.prodImg ? (
            <Box
              component="img"
              src={data.prodImg}
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
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            minHeight: "100px",
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
            신청정보
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: "100%",
              flex: "1 0 auto",
              mt: "1%",
            }}
          >
            {data.requestComment}
          </Typography>
        </Box>
        {!isUpdating ? (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              minHeight: "100px",
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
              응답 정보
            </Typography>
            <Typography
              variant="body1"
              sx={{
                width: "100%",
                flex: "1 0 auto",
                mt: "1%",
                color: data.repairComment ? "#000000" : "#8C92AC",
              }}
            >
              {data.status === "응답 완료" ? data.repairComment : "응답 대기중"}
            </Typography>
          </Box>
        ) : (
          <TextField
            label="응답 정보 입력"
            required
            autoFocus
            multiline
            rows={3}
            sx={{
              width: "100%",
              minHeight: "100px",
              mt: "3%",
            }}
            name="repairComment"
            value={formData.repairComment}
            onChange={handleChange}
          />
        )}

        <>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              minHeight: "100px",
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
              예상 금액
            </Typography>
            {data.status === "응답 완료" ? (
              <Typography
                variant="body1"
                sx={{
                  width: "100%",
                  flex: "1 0 auto",
                  mt: "1%",
                }}
              >
                {data.minPrice} ITEM 포인트 ~ {data.maxPrice} ITEM 포인트
              </Typography>
            ) : !isUpdating ? (
              <Typography
                variant="body1"
                sx={{
                  width: "100%",
                  flex: "1 0 auto",
                  mt: "1%",
                  color: data.repairComment ? "#000000" : "#8C92AC",
                }}
              >
                {data.repairComment ? data.repairComment : "응답 대기중"}
              </Typography>
            ) : (
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    label="최소"
                    size="small"
                    type="number"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                  />
                  <Typography sx={{ ml: "10%" }}>ITEM 포인트</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>~</p>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="최대"
                    size="small"
                    type="number"
                    required
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                  />
                  <Typography sx={{ ml: "10%" }}>ITEM 포인트</Typography>
                </Grid>
              </Grid>
            )}
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              minHeight: "100px",
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
              예상 소요 시간
            </Typography>
            {data.status === "응답 완료" ? (
              <Typography
                variant="body1"
                sx={{
                  width: "100%",
                  flex: "1 0 auto",
                  mt: "1%",
                }}
              >
                {data.minTime} ~ {data.maxTime}
              </Typography>
            ) : !isUpdating ? (
              <Typography
                variant="body1"
                sx={{
                  width: "100%",
                  flex: "1 0 auto",
                  mt: "1%",
                  color: data.repairComment ? "#000000" : "#8C92AC",
                }}
              >
                {data.repairComment ? data.repairComment : "응답 대기중"}
              </Typography>
            ) : (
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={4}>
                  <FormControl fullWidth required>
                    <InputLabel>최소</InputLabel>
                    <Select
                      name="minTime"
                      value={formData.minTime}
                      onChange={handleChange}
                    >
                      {timeList.map((time) => (
                        <MenuItem key={time.label} value={time.value}>
                          {time.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>~</p>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth required>
                    <InputLabel>최대</InputLabel>
                    <Select
                      name="maxTime"
                      value={formData.maxTime}
                      onChange={handleChange}
                    >
                      {timeList.map((time) =>
                        time.value === 0 ? null : (
                          <MenuItem key={time.label} value={time.value}>
                            {time.label}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Box>
        </>

        {location.state?.role === "repair" && data.status === "응답 대기" ? (
          <>
            {!isUpdating && (
              <Button
                onClick={handleUpdate}
                variant="contained"
                fullWidth
                sx={{ mt: "3%" }}
              >
                견적 응답 작성
              </Button>
            )}
          </>
        ) : null}
      </Container>
    </>
  );
};
