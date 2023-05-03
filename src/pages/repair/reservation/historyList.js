import { Container, Grid, Typography } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MoreButtonRepair = ({ data }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    handleClose(e);
    console.log("수정: " + selectedId);
    navigate(`/repair/privateShops/${data.shopId}/update/${data.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleClose(e);

    if (window.confirm("해당 내역을 삭제하시겠습니까?")) {
      console.log(selectedId);
      window.location.reload();
    }
  };
  return (
    <>
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
        onClose={(e) => {
          handleClose(e);
          setSelectedId(null);
        }}
      >
        {data.status === "신청 완료" && (
          <MenuItem onClick={(e) => handleUpdate(e)}>수정</MenuItem>
        )}
        {data.status === "정비 완료" && (
          <MenuItem onClick={(e) => handleDelete(e)}>삭제</MenuItem>
        )}
      </Menu>
    </>
  );
};

export const HistoryList = ({ itemList }) => {
  return (
    <>
      <Container>
        {itemList.map((data) => (
          <Grid
            container
            key={data.id}
            sx={{
              mt: 2,
              backgroundColor: "#F9F9F9",
              height: "100px",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={
              data.status === "신청 완료"
                ? () => {
                    window.location.href = `/repair/mypage/reservation/${data.id}`;
                  }
                : data.status === "정비 완료"
                ? () => {
                    console.log(data.id + " 의 정비리포트로 이동");
                  }
                : null
            }
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
              <img src={data.img} alt="" width={"80%"} height={"80%"}></img>
            </Grid>
            <Grid item xs={7}>
              <Grid container sx={{ ml: 1, p: 1 }}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color:
                        data.status === "신청 완료"
                          ? "#E3DA64"
                          : data.status === "정비 완료"
                          ? "#88CDAB"
                          : "#9A9A9A",
                    }}
                  >
                    {data.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#747373",
                    }}
                  >
                    {data.product}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "17px" }}>
                    {data.service}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} id={data.id}>
              <MoreButtonRepair data={data} />
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};
