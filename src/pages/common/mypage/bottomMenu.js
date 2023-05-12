import { Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

export const BottomMenu = ({ roleType, userId }) => {
  const navigate = useNavigate();

  const logOutClick = (e) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.replace("/");
  };

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
            onClick={(e) => navigate(`/mypage/repair`)}
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
            onClick={(e) => navigate(`/community/mypage/${userId}`)}
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
          onClick={(e) => navigate(`/user/infoUpdate`)}
        >
          개인정보 수정
        </Grid>
        {roleType === "MEMBER" ? (
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
            onClick={(e) => navigate(`/mypage/device`)}
          >
            나의 IT 기기관리
          </Grid>
        ) : null}

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
          onClick={logOutClick}
        >
          로그아웃
        </Grid>
      </Grid>
    </Container>
  );
};
