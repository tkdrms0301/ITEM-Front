import { Grid, Typography, Button, Container } from "@mui/material";
import { BackButton } from "./backButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { post } from "../api";
import { v4 as uuidv4 } from "uuid";

export const TitleButtonBar = ({
  transmitData,
  query,
  buttonLabel,
  completed,
  reservationId,
  isUpdating,
}) => {
  const navigate = useNavigate();

  function isBase64Encoded(data) {
    const base64Regex = /^data:(.*?);base64,/;

    return base64Regex.test(data);
  }

  const handleButton = () => {
    if (completed.isCompleted) {
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
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
    //title에 예약 이라는 문자열 포함 여부
  };

  return (
    <Container sx={{ my: 2 }}>
      {buttonLabel == null ? null : (
        <Button
          fullWidth
          color="inherit"
          variant="contained"
          onClick={handleButton}
        >
          {buttonLabel}
        </Button>
      )}
    </Container>
  );
};
