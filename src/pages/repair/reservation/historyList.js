import { Container, Grid, Typography } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoreButtonRepair = ({ data, role }) => {
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
    navigate(`/repair/privateShops/${data.repairShopId}/update/${data.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleClose(e);

    if (window.confirm("해당 내역을 삭제하시겠습니까?")) {
      console.log(selectedId);
      window.location.reload();
    }
  };
  if (role === "user") {
    if (data.status === "예약 완료") {
      return;
    }
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
          {data.status === "예약 대기" && (
            <MenuItem onClick={(e) => handleUpdate(e)}>수정</MenuItem>
          )}
          {data.status === "정비 완료" && (
            <MenuItem onClick={(e) => handleDelete(e)}>삭제</MenuItem>
          )}
        </Menu>
      </>
    );
  } else if (role === "repair") {
    if (data.status === "예약 대기" || data.status === "예약 완료") {
      return;
    }
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
          <MenuItem onClick={(e) => handleDelete(e)}>삭제</MenuItem>
        </Menu>
      </>
    );
  } else {
    return;
  }
};

export const HistoryList = ({ itemList, role }) => {
  const navigate = useNavigate();
  return (
    <>
      {itemList !== undefined ? (
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
                role === "user"
                  ? data.status === "예약 완료" || data.status === "예약 대기"
                    ? () => {
                        navigate({
                          pathname: `/repair/mypage/reservation/${data.id}`,
                        });
                      }
                    : data.status === "정비 완료"
                    ? () => {
                        console.log(data.id);
                        navigate(
                          {
                            pathname: "/repair/readReport",
                          },
                          {
                            state: { repairId: data.id }, //수정해야함
                          }
                        );
                      }
                    : null
                  : role === "repair"
                  ? data.status === "예약 대기"
                    ? () => {
                        navigate(
                          { pathname: `/repair/mypage/reservation/${data.id}` },
                          { state: { role: role } }
                        );
                      }
                    : data.status === "예약 완료"
                    ? () => {
                        console.log(data.id);
                        navigate(
                          {
                            pathname: "/repair/registReport",
                          },
                          {
                            state: { repairId: data.id }, //수정해야함
                          }
                        );
                      }
                    : data.status === "정비 완료"
                    ? () => {
                        console.log(data.id);
                        navigate(
                          {
                            pathname: "/repair/readReport",
                          },
                          {
                            state: { repairId: data.id }, //수정해야함
                          }
                        );
                      }
                    : null
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
                <img
                  src={data.prodImg}
                  alt=""
                  width={"80%"}
                  height={"80%"}
                ></img>
              </Grid>
              <Grid item xs={7}>
                <Grid container sx={{ ml: 1, p: 1 }}>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color:
                          data.status === "예약 완료"
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
                      {data.productName}
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
                <MoreButtonRepair data={data} role={role} />
              </Grid>
            </Grid>
          ))}
        </Container>
      ) : null}
    </>
  );
};
