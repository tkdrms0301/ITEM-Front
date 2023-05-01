import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export const BottomMenu = ({ buttonMenu }) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "5%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        pl: "0",
        pr: "0",
      }}
    >
      <Grid container sx={{ display: "flex" }}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "#E0E0E0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            fontWeight: "bold",
            mr: "3%",
          }}
          onClick={(e) => navigate(`/`)}
        >
          마켓 페이지
        </Grid>
        <Grid item xs={5.5}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#E0E0E0",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
              alignItems: "center",
              fontWeight: "bold",
              p: "5%",
            }}
          >
            정비소 마이페이지
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#E0E0E0",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
              alignItems: "center",
              mt: "5%",
              p: "5%",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onClick={(e) => navigate(`/`)}
          >
            커뮤니티 마이페이지
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#E0E0E0",
            display: "flex",
            justifyContent: "center",
            borderRadius: "3px",
            alignItems: "center",
            mt: "5%",
            p: "2%",
            fontSize: "15px",
            fontWeight: "bold",
          }}
          onClick={(e) => navigate(`/InfoCorrection`)}
        >
          개인정보 수정
        </Grid>
      </Grid>
    </Container>
  );
};
