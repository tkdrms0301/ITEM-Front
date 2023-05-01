import { Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export const Sign = () => {
  const [roleType, setRoleType] = useState("일반사용자");
  const [isActive, setIsActive] = useState(false);
  const [roleIndex, setRoleIndex] = useState(3);

  const roleList = [
    { type: "일반사용자" },
    { type: "판매자" },
    { type: "정비사" },
  ];

  const handleClick = (e, index) => {
    // 👇️ toggle
    console.log(e.target.innerHTML);
    if (e.target.innerHTML == "일반사용자") setRoleIndex((roleIndex) => 0);
    else if (e.target.innerHTML == "판매자") setRoleIndex((roleIndex) => 1);
    else if (e.target.innerHTML == "정비사") setRoleIndex((roleIndex) => 2);
  };

  return (
    <Grid container spacing={1}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: "10%",
          marginBottom: "5%",
          textAlign: "center",
        }}
      >
        <img src="/ItemLogo.png" width={"80%"}></img>
      </Container>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          boxSizing: "border-box",
          borderTop: "1px solid #D3D1D1 ",
          borderLeft: "1px solid #D3D1D1 ",
          borderBottom: "1px solid #D3D1D1 ",
          justifyContent: "center",
          textAlign: "center",
          width: "80%",
          display: "flex",
        }}
      >
        {roleList.map((data, index) => (
          <Grid
            key={index}
            item
            xs={4}
            onClick={handleClick}
            sx={{
              borderRight: "1px solid #D3D1D1",
              backgroundColor: index == roleIndex ? "#D3D1D1" : "",
              p: "5px",
              zIndex: "0",
            }}
          >
            {data.type}
          </Grid>
        ))}
      </Container>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: "3%",
          boxSizing: "border-box",
          backgroundColor: "#F6F6F6",
          justifyContent: "center",
          textAlign: "center",
          width: "80%",
          display: "flex",
        }}
      >
        <div sx={{ display: "flex" }}>
          <Grid sx={{ justifyContent: "flex-start" }}>
            <Typography>이메일</Typography>
          </Grid>
          <div></div>
        </div>
      </Container>
    </Grid>
  );
};
