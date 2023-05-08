import "../css/RepairReport.css";
import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MoreButton } from "./MoreButton";
import { ReportDialog } from "../../community/component/reportDialog";
import { RepairReportData } from "../data/RepairReportData";
import { TextField, FormControl, Button } from "@mui/material";

export const ReportResult = ({ isRegist }) => {
  const [modalState, setModalState] = useState(false);
  const [modalImgState, setModalImgState] = useState("");

  const [reportResultImgs, setReportResultImgs] = useState([]);
  const imageInput = useRef();

  const [reportResultComment, setReportResultComment] = useState("");

  const location = useLocation();

  const [reservationId, setReservationId] = useState(0);

  const [reportResult, setReportResult] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (isRegist) {
      setReportResult(RepairReportData);
    } else {
      setReservationId(location.state?.repairId);
      setReportResult(RepairReportData);
    }
  }, []);

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

  const onClickPlusImg = () => {
    imageInput.current.click();
  };
  const saveImgFile = () => {
    if (imageInput.current && imageInput.current.files.length > 0) {
      const file = imageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setReportResultImgs([...reportResultImgs, reader.result]);
      };
    }
  };
  const onClickRegist = () => {
    console.log("onClickRegist");
    navigate(
      {
        pathname: "/repair/readReport",
      },
      { state: { repairId: 1 } }
    );
  };

  const topButtonByIsRegist = () => {
    if (isRegist) {
      return (
        <>
          <Button
            variant="contained"
            style={{ marginRight: "20px" }}
            onClick={() => onClickRegist()}
          >
            등록
          </Button>
        </>
      );
    } else {
      return (
        <>
          <MoreButton reportId={1} onReport={handleReportDialogOpen} />
        </>
      );
    }
  };

  const reportResultImgContentByIsRegist = () => {
    if (isRegist) {
      return (
        <>
          {reportResultImgs.map((img, index) => (
            <div className="img_common_div" key={index}>
              <img className="img_content" src={img} alt="after" />
            </div>
          ))}
          <div className="img_common_div">
            <img
              className="img_content"
              src={process.env.PUBLIC_URL + "/plus.png"}
              onClick={() => onClickPlusImg()}
              alt="add"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInput}
            onChange={saveImgFile}
          />
        </>
      );
    } else {
      return (
        <>
          {reportResult.reservationResultImgs.map((img, index) => (
            <div className="img_common_div" key={index}>
              <img
                className="img_content"
                src={img.reservationResultImg}
                onClick={() => {
                  setModalState(true);
                  setModalImgState(img.reservationResultImg);
                }}
                alt="after"
              />
            </div>
          ))}
        </>
      );
    }
  };

  const reportResultTextContentByIsRegist = () => {
    if (isRegist) {
      return (
        <>
          <FormControl fullWidth>
            <TextField
              multiline
              label="정비 결과"
              value={reportResultComment}
              onChange={(event) => {
                setReportResultComment(event.target.value);
              }}
            ></TextField>
          </FormControl>
        </>
      );
    } else {
      return (
        <>
          <div className="report_text">{reportResult.comment}</div>
        </>
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

  const onClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <>
      {reportResult ? (
        <div className="report_page">
          <Modal isOpen={modalState} style={modalStyles} ariaHideApp={false}>
            <img
              src={modalImgState}
              onClick={() => setModalState(false)}
              style={modalImgStyles}
              alt="beforeImg"
            />
          </Modal>
          <div className="top_field">
            <div className="backButton_title">
              <img
                className="backButton"
                src={process.env.PUBLIC_URL + "/backButton.png"}
                style={{ width: "10vw", height: "10vw" }}
                alt="back"
                onClick={onClickBackBtn}
              />
              {isRegist ? (
                <div className="title">정비 리포트 등록</div>
              ) : (
                <div className="title">정비 리포트</div>
              )}
            </div>
            {topButtonByIsRegist()}
          </div>
          <div className="product_info area">
            <div className="prod_info_title line">제품 정보</div>
            <div className="prod_info_content content img_common_field">
              <div className="prod_info__img img_common_div">
                <img
                  className="img_content"
                  src="https://via.placeholder.com/150"
                  alt="product"
                />
              </div>
              <div className="prod_info__name">{reportResult.prodName}</div>
            </div>
          </div>
          <div className="request area">
            <div className="request_title line">신청 정보</div>
            <div className="request_content content">
              {reportResult.reservationRequest}
            </div>
          </div>
          <div className="report area">
            <div className="report_title line">정비 리포트</div>
            <div className="report_content content">
              <div className="report_img">
                <div className="img_text">
                  <div className="before_img_text text">수리 전</div>
                  <div className="after_img_text text">수리 후</div>
                </div>
                <div className="repair_img_field">
                  <div className="img_common_field">
                    {reportResult.reservationImgs.map((img, index) => (
                      <div className="img_common_div" key={index}>
                        <img
                          className="img_content"
                          src={img.reservationImg}
                          onClick={() => {
                            setModalState(true);
                            setModalImgState(img.reservationImg);
                          }}
                          alt="before"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="img_common_field">
                    {reportResultImgContentByIsRegist()}
                  </div>
                </div>
              </div>
              {reportResultTextContentByIsRegist()}
            </div>
          </div>
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
        </div>
      ) : null}
    </>
  );
};
