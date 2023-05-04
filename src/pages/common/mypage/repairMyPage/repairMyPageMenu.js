import { Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

export const RepairMyPageMenu = () => {
  const navigate = useNavigate();

  const menuList = [
    {
      title: "수익조회",
      navigate: `/mypage/incomeMonitor`,
    },
    {
      title: "서비스 항목 관리",
      navigate: `/mypage/device`,
    },
  ];
  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "3%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        pl: "0",
        pr: "0",
      }}
    >
      <Grid container sx={{ display: "flex" }}>
        {menuList.map((data, index) => (
          <Grid
            key={index}
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
            onClick={(e) => navigate(data.navigate)}
          >
            {data.title}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
