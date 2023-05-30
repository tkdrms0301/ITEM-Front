import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReportDialog } from "../../community/component/reportDialog";
import { RepairReportData } from "../data/RepairReportData";
import palette from "../../../theme/palette";
import {
  TextField,
  FormControl,
  Button,
  Container,
  Card,
  Typography,
  Box,
} from "@mui/material";
import { Header } from "./header";
import { get, post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";

export const ReportResult = ({ isRegist }) => {
  const [modalState, setModalState] = useState(false);
  const [modalImgState, setModalImgState] = useState("");

  const [reportBeforeImgs, setReportBeforeImgs] = useState([]);
  const [reportAfterImgs, setReportAfterImgs] = useState([]);
  const afterImageInput = useRef();
  const beforeImageInput = useRef();

  const [reportResultComment, setReportResultComment] = useState("");

  const location = useLocation();

  const [reservationId, setReservationId] = useState(0);
  const [reportResult, setReportResult] = useState();
  const [reportInfo, setReportInfo] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setReservationId(location.state?.repairId);

    get(BaseUrl + "/api/repair/report/info", {
      params: { reservationId: location.state?.repairId },
    }).then((res) => {
      console.log(res.data.data);
      setReportInfo(res.data.data);
    });

    get(BaseUrl + "/api/repair/report", {
      params: { reservationId: location.state?.repairId },
    }).then((res) => {
      console.log(res.data.data);
      setReportResult(res.data.data);
    });
  }, [isRegist]);

  //report
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportTarget, setReportTarget] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");

  const handleReportCancel = () => {
    setShowReportDialog(false);
    setReportType("");
    setReportTarget("");
    setReportReason("");
    setReportComment("");
  };

  const handleReportSubmit = (report) => {
    setShowReportDialog(false);
    setReportType("");
    setReportTarget("");
    setReportReason("");
    setReportComment("");
  };
  const handleReportDialogOpen = (report) => {
    setShowReportDialog(true);
    setReportType(report.type);
    setReportTarget(report.target);
  };

  //report end

  const onClickBeforeImgPlus = () => {
    beforeImageInput.current.click();
  };
  const onClickAfterImgPlus = () => {
    afterImageInput.current.click();
  };
  const saveBeforeImgFile = () => {
    if (beforeImageInput.current && beforeImageInput.current.files.length > 0) {
      const file = beforeImageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setReportBeforeImgs([...reportBeforeImgs, reader.result]);
      };
    }
  };

  const saveAfterImgFile = () => {
    if (afterImageInput.current && afterImageInput.current.files.length > 0) {
      const file = afterImageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setReportAfterImgs([...reportAfterImgs, reader.result]);
      };
    }
  };
  const onClickRegist = async () => {
    const formData = new FormData();
    formData.append("reservationId", reservationId);
    formData.append("reportResultComment", reportResultComment);

    // reportBeforeImgs 추가
    for (let i = 0; i < reportBeforeImgs.length; i++) {
      const fileData = dataURItoBlob(reportBeforeImgs[i]);
      formData.append("reportBeforeImgs", fileData, `reportBeforeImg_${i}`);
    }

    // reportAfterImgs 추가
    for (let i = 0; i < reportAfterImgs.length; i++) {
      const fileData = dataURItoBlob(reportAfterImgs[i]);
      formData.append("reportAfterImgs", fileData, `reportAfterImg_${i}`);
    }

    try {
      const response = await post(
        BaseUrl + "/api/repair/report/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.data) {
        navigate(
          {
            pathname: "/repair/readReport",
          },
          { state: { repairId: reservationId } }
        );
        alert("등록이 완료되었습니다.");
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Data URI를 Blob 객체로 변환하는 함수
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const topButtonByIsRegist = () => {
    if (isRegist) {
      return (
        <Container>
          <Button
            variant="contained"
            size="small"
            fullWidth
            color="inherit"
            sx={{ my: 2 }}
            onClick={() => onClickRegist()}
          >
            등록
          </Button>
        </Container>
      );
    }
  };

  const reportResultImgContentByIsRegist = () => {
    if (isRegist) {
      return (
        <>
          <Box>
            {reportBeforeImgs.map((img, index) => (
              <Box
                key={index}
                sx={{ width: "100px", height: "150px", position: "relative" }}
              >
                <Box
                  component="img"
                  src={img}
                  alt="after"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "0px",
                    bottom: "0px",
                  }}
                />
              </Box>
            ))}
            <Box>
              <Box
                component="img"
                src={"/camera-outline.svg"}
                alt="손상부위 사진"
                sx={{ minWidth: "100px" }}
              />
              <Button
                variant="contained"
                component="label"
                color="inherit"
                sx={{
                  borderRadius: "20px",
                  bgcolor: "white",
                  color: "ButtonText",
                  mb: 2,
                }}
                onClick={() => onClickBeforeImgPlus()}
              >
                <Typography variant="subtitle2">+ 사진추가</Typography>
              </Button>
            </Box>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={beforeImageInput}
              onChange={saveBeforeImgFile}
            />
          </Box>

          <Box>
            {reportAfterImgs.map((img, index) => (
              <Box
                key={index}
                sx={{ width: "100px", height: "150px", position: "relative" }}
              >
                <Box
                  component="img"
                  src={img}
                  alt="after"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "0px",
                    bottom: "0px",
                  }}
                />
              </Box>
            ))}
            <Box>
              <Box
                component="img"
                src={"/camera-outline.svg"}
                alt="정비 후 사진"
                sx={{ minWidth: "100px" }}
              />
              <Button
                variant="contained"
                component="label"
                color="inherit"
                sx={{
                  borderRadius: "20px",
                  bgcolor: "white",
                  color: "ButtonText",
                }}
                onClick={() => onClickAfterImgPlus()}
              >
                <Typography variant="subtitle2">+ 사진추가</Typography>
              </Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={afterImageInput}
                onChange={saveAfterImgFile}
              />
            </Box>
          </Box>
        </>
      );
    } else {
      return (
        <>
          {reportResult.beforeRepairResultImages ? (
            <Box>
              {reportResult.beforeRepairResultImages.map((img, index) => (
                <Box key={index} sx={{ width: "100px", height: "130px" }}>
                  <Box
                    component="img"
                    src={img}
                    alt="after"
                    sx={{
                      border: "1px solid #f1f1f1",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      my: 1,
                    }}
                    onClick={() => {
                      setModalState(true);
                      setModalImgState(img);
                    }}
                  />
                </Box>
              ))}
            </Box>
          ) : null}
          {reportResult.afterRepairResultImages ? (
            <Box>
              {reportResult.afterRepairResultImages.map((img, index) => (
                <Box key={index} sx={{ width: "100px", height: "130px" }}>
                  <Box
                    component="img"
                    src={img}
                    alt="after"
                    sx={{
                      border: "1px solid #f1f1f1",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      my: 1,
                    }}
                    onClick={() => {
                      setModalState(true);
                      setModalImgState(img);
                    }}
                  />
                </Box>
              ))}
            </Box>
          ) : null}
        </>
      );
    }
  };

  const reportResultTextContentByIsRegist = () => {
    if (isRegist) {
      return (
        <>
          <Container>
            <FormControl fullWidth>
              <TextField
                multiline
                label="정비 결과"
                size="small"
                value={reportResultComment}
                onChange={(event) => {
                  setReportResultComment(event.target.value);
                }}
              ></TextField>
            </FormControl>
          </Container>
        </>
      );
    } else {
      return (
        <Container>
          {reportResult ? (
            <Card sx={{ mt: 2, boxShadow: 10, py: 2, px: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  borderBottom: "2px solid",
                  borderColor: palette.grey[400],
                }}
              >
                정비 담당자의 코멘트
              </Typography>
              <Typography variant="subtitle1">
                {reportResult.comment}
              </Typography>
            </Card>
          ) : null}
        </Container>
      );
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

  return (
    <>
      <Box>
        <Modal isOpen={modalState} style={modalStyles} ariaHideApp={false}>
          <img
            src={modalImgState}
            onClick={() => setModalState(false)}
            style={modalImgStyles}
            alt="beforeImg"
          />
        </Modal>
        {isRegist ? (
          <Header title={"정비 리포트 등록"} />
        ) : (
          <Header
            title={"정비 리포트"}
            handleReportDialogOpen={handleReportDialogOpen}
          />
        )}
        {reportInfo ? (
          <Container sx={{ my: 2 }}>
            <Card sx={{ boxShadow: 10, my: 2, py: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  px: 2,
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: palette.grey[400],
                }}
              >
                제품 정보
              </Typography>
              <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={reportInfo.productImageUrl}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {reportInfo.productName}
                </Typography>
              </Box>
            </Card>
            <Card sx={{ boxShadow: 10, mt: 2, py: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  px: 2,
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: palette.grey[400],
                }}
              >
                신청 정보
              </Typography>

              <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="body2">{reportInfo.comment}</Typography>
              </Box>
            </Card>
            <Card sx={{ boxShadow: 10, mt: 2, py: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  px: 2,
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: palette.grey[400],
                }}
              >
                정비 결과
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    my: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        px: 1,
                        py: 1,
                        backgroundColor: palette.error.light,
                        borderRadius: "10px",
                        color: palette.info.contrastText,
                      }}
                    >
                      수리 전
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        px: 1,
                        py: 1,
                        backgroundColor: palette.info.light,
                        borderRadius: "10px",
                        color: palette.info.contrastText,
                      }}
                    >
                      수리 후
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  {reportResultImgContentByIsRegist()}
                </Box>
                {reportResultTextContentByIsRegist()}
              </Box>
            </Card>
            {topButtonByIsRegist()}
          </Container>
        ) : null}
        {showReportDialog && (
          <ReportDialog
            reportType={reportType}
            reportReason={reportReason}
            reportTarget={reportTarget}
            reportComment={reportComment}
            onReportCancel={handleReportCancel}
            onReportSubmit={handleReportSubmit}
          />
        )}
      </Box>
    </>
  );
};
