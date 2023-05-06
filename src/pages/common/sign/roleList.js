import { Container, Grid, Typography } from "@mui/material";

export const RoleList = ({ roleType, setRoleType }) => {
  const roleList = [
    { type: "일반사용자" },
    { type: "판매자" },
    { type: "정비사" },
  ];

  const handleClick = (e, index) => {
    if (e.target.innerHTML == "일반사용자")
      setRoleType((roleType) => e.target.innerHTML);
    else if (e.target.innerHTML == "판매자")
      setRoleType((roleType) => e.target.innerHTML);
    else if (e.target.innerHTML == "정비사")
      setRoleType((roleType) => e.target.innerHTML);
  };

  return (
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
            backgroundColor: data.type == roleType ? "#D3D1D1" : "",
            p: "5px",
            zIndex: "0",
          }}
        >
          {data.type}
        </Grid>
      ))}
    </Container>
  );
};
