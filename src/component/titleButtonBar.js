import { Grid, Typography, Button } from "@mui/material";
import { BackButton } from "./backButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { post } from "../api";
import { v4 as uuidv4 } from "uuid";

export const TitleButtonBar = ({
  title,
  transmitData,
  query,
  buttonLabel,
  completed,
  reservationId,
  isUpdating,
}) => {
  const titleBarStyle = {
    position: "fixed",
    bgcolor: "white",
    zIndex: 100,
    width: "100%",
    height: "56px",
    borderBottom: "1px solid black",
    alignItems: "center",
  };
  const navigate = useNavigate();

  function isBase64Encoded(data) {
    const base64Regex = /^data:(.*?);base64,/;

    return base64Regex.test(data);
  }

  const handleButton = () => {
    alert();

    //title에 예약 이라는 문자열 포함 여부
    if (title.includes("예약")) {
      for (let i = 0; i < transmitData.services.length; i++) {
        console.log(transmitData.services[i].serviceName);
        console.log(transmitData.services[i].price);
      }
      const formData = new FormData();
      for (let i = 0; i < transmitData.rvRequestImgs.length; i++) {
        const imageData = transmitData.rvRequestImgs[i];
        const uniqueId = uuidv4();

        // Base64로 올바르게 인코딩된 문자열인 경우에만 처리
        if (isBase64Encoded(imageData)) {
          const base64Data = imageData;
          const byteCharacters = atob(base64Data.split(",")[1]);
          const byteArrays = new Uint8Array(byteCharacters.length);

          for (let j = 0; j < byteCharacters.length; j++) {
            byteArrays[j] = byteCharacters.charCodeAt(j);
          }

          const blob = new Blob([byteArrays], { type: "image/png" });
          const fileName = `${uniqueId}-${i + 1}.jpg`;
          formData.append("rvRequestImgs", blob, fileName);
        } else {
          formData.append("rvRequestImgs", imageData);
        }
      }
      formData.append("comment", transmitData.comment || "");
      formData.append("prodImg", transmitData.prodImg);
      formData.append("repairShopId", transmitData.repairShopId);

      formData.append("productName", transmitData.productName);
      for (let i = 0; i < transmitData.services.length; i++) {
        formData.append("serviceName", transmitData.services[i].serviceName);
        formData.append("price", transmitData.services[i].price);
      }
      formData.append("date", transmitData.date);
      formData.append("time", transmitData.time);

      if (reservationId !== null) {
        formData.append("reservationId", reservationId.toString());
      }

      post(query, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        //console.log(res);
      });
    } else if (title.includes("견적")) {
      if (isUpdating) {
        //응답
        console.log(transmitData);
        post(query, transmitData).then((res) => {
          //console.log(res);
        });
      }
    }
  };

  const alert = () => {
    if (completed.isCompleted) {
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
  };

  return (
    <Grid container sx={titleBarStyle}>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BackButton />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        {buttonLabel == null ? null : (
          <Button
            variant="contained"
            onClick={handleButton}
            sx={{ ml: "-15%" }}
          >
            {buttonLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
