import { Button, Grid, Typography } from "@mui/material";
import { BackButton } from "./backButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { post } from "../api";

export const TitleButtonBar = ({
  title,
  buttonLabel,
  query,
  transmitData,
  completed,
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
      const file = new File(
        [transmitData.rvRequestImgs[i]],
        `image${i + 1}.png`,
        {
          type: "image/png",
        }
      );
      formData.append("rvRequestImgs", file);
    }
    formData.append("productName", transmitData.productName);
    for (let i = 0; i < transmitData.services.length; i++) {
      formData.append("services", transmitData.services[i]);
    }
    formData.append("comment", transmitData.comment);
    formData.append("date", transmitData.date);
    formData.append("time", transmitData.time);
    formData.append("prodImg", transmitData.prodImg);
    formData.append("repairShopId", transmitData.repairShopId);

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
