import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useEffect, useState } from "react";
import { EstimateUploadFile } from "./estimateUploadFile";
import { EstimateComment } from "./estimateComment";
import { useParams } from "react-router-dom";

export const Estimate = () => {
  const shopId = useParams();
  const [uploadImgFile, setUploadImgFile] = useState("");

  //transtmit data
  const [data, setData] = useState({
    userId: 0,
    repairId: shopId,
    product: "",
    comment: "",
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

  console.log(data);
  return (
    <>
      <TitleButtonBar
        title={"견적 요청서"}
        query={""}
        transmitData={data}
        completed={completed}
      />

      <EstimateUploadFile
        data={data}
        uploadImgFile={uploadImgFile}
        setUploadImgFile={setUploadImgFile}
        handleData={handleData}
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
