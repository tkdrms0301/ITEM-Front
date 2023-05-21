import { Button, Grid, Typography } from "@mui/material";
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
}) => {
  const titleBarStyle = {
    position: "fixed",
    bgcolor: "white",
    zIndex: 100,
    maxWidth: "sm",
    width: "100%",
    height: "56px",
    borderBottom: "1px solid black",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const handleButton = () => {
    alert();

    console.log(transmitData);
    const formData = new FormData();
    for (let i = 0; i < transmitData.rvRequestImgs.length; i++) {
      const uniqueId = uuidv4(); // 고유한 UUID 생성

      const fileName = `${uniqueId}-${i + 1}.jpg`;

      const file = new File([transmitData.rvRequestImgs[i]], fileName, {
        type: "image/jpeg",
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageElement = document.createElement("img");
        imageElement.src = e.target.result;
        document.body.appendChild(imageElement);
      };
      reader.readAsDataURL(file);
      formData.append("rvRequestImgs", file);
    }
    formData.append("comment", transmitData.comment || "");
    formData.append("prodImg", transmitData.prodImg);
    formData.append("repairShopId", transmitData.repairShopId);

    formData.append("productName", transmitData.productName);
    for (let i = 0; i < transmitData.services.length; i++) {
      formData.append("services", transmitData.services[i]);
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
      <Grid item xs={2}>
        <BackButton />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
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
