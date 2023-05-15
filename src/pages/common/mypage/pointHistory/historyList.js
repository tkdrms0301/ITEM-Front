import { Container, Grid, Typography } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import axios from "axios";
export const HistoryList = ({ itemList }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    handleClose();

    if (window.confirm("해당 내역을 삭제하시겠습니까?")) {
      let token = JSON.parse(window.localStorage.getItem("token")).accessToken;

      axios
        .delete("http://localhost:8080/api/point/history", {
          params: {
            id: selectedId,
          },
          headers: { "X-AUTH-TOKEN": token },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container>
        {itemList.map((data, index) => (
          <Grid
            container
            key={index}
            sx={{ mt: 2, backgroundColor: "#F9F9F9" }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={data.img} width={"50%"} height={"80%"}></img>
            </Grid>
            <Grid item xs={7}>
              <Grid container sx={{ ml: 1, p: 1 }}>
                <Grid item xs={12}>
                  <Typography
                    variant="h7"
                    sx={{ fontWeight: "bold", color: "#9A9A9A" }}
                  >
                    {data.serviceName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#747373",
                    }}
                  >
                    {data.serviceType}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    {data.point.toLocaleString()} ITEM 포인트
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} id={data.id}>
              <IconButton
                aria-label="more"
                aria-controls={`more-menu-${data.id}`}
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, data.id)}
              >
                <MoreVertIcon sx={{ fontSize: "30px" }} />
              </IconButton>
              <Menu
                id={`more-menu-${data.id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                  handleClose();
                  setSelectedId(null);
                }}
              >
                <MenuItem onClick={(e) => handleDelete(e)}>삭제</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};
