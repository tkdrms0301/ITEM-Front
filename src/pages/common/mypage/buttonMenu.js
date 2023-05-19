import { Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

export const ButtonMenu = ({}) => {
  const navigate = useNavigate();
  const buttonMenu = [
    {
      name: "이용내역",
      link: "/point/history",
    },
    {
      name: "충전",
      link: "/",
    },
    {
      name: "환급",
      link: "/",
    },
  ];
  return (
    <Container
      maxWidth={false}
      sx={{
        pb: 1,
        width: "90%",
        display: "flex",
        pl: 0,
        pr: 0,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#65A8E7",
            color: "#EFE5D8",
            fontWeight: "bold",
          }}
        >
          {buttonMenu.map((item, index) =>
            item.name === "충전" ? (
              <Grid
                key={index}
                item
                xs={4}
                sx={{
                  textAlign: "center",
                  p: "3%",
                  fontWeight: "bold",
                  ":hover": {
                    bgcolor: "#929191",
                  },
                  borderLeft: "2px solid #C6E9FA",
                  borderRight: "2px solid #C6E9FA",
                }}
                onClick={(e) => navigate(item.link)}
              >
                {item.name}
              </Grid>
            ) : (
              <Grid
                key={index}
                item
                xs={4}
                sx={{
                  textAlign: "center",
                  p: "3%",
                  fontWeight: "bold",
                  ":hover": {
                    bgcolor: "#246D87",
                  },
                }}
                onClick={(e) => navigate(item.link)}
              >
                {item.name}
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
