import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useEffect, useState } from "react";
import { EstimateUploadFile } from "./estimateUploadFile";
import { EstimateComment } from "./estimateComment";
import { useParams, useLocation } from "react-router-dom";
import { post, get } from "../../../api";
import { Header } from "./header";
import { Container, Grid } from "@mui/material";
import { BaseUrl } from "../../../api/BaseUrl";

export const Estimate = () => {
  const location = useLocation();

  const repairShopId = location.state?.repairShopId;

  //my it devices
  const [myItDevices, setMyItDevices] = useState([]);

  //transtmit data
  const [data, setData] = useState({
    repairShopId: repairShopId,
    product: "",
    comment: "",
    requestImg: "",
  });
  //completed
  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });
  const handleCompleted = () => {
    if (data.product === "" || data.comment === "") {
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
  //transtmit data end

  useEffect(
    (data) => {
      handleCompleted();
    },
    [data]
  );

  useEffect(() => {
    get(BaseUrl + "/api/repair/estimate/init")
      .then((res) => {
        setMyItDevices(res.data.myItems);
      })
      .catch((error) => {
        // 에러 처리
      });
  }, []);

  return (
    <>
      <Header />

      <EstimateUploadFile
        data={data}
        handleData={handleData}
        setData={setData}
        myItDevices={myItDevices}
      />

      <EstimateComment
        completed={completed}
        data={data}
        handleData={handleData}
      ></EstimateComment>

      {/* <Box
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
          <Typography>
            {products.map(
              (product) => product.id === data.product && product.title
            )}
          </Typography>
        </Box> */}
    </>
  );
};
