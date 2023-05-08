import { Container, Grid, Typography } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConstructionIcon from "@mui/icons-material/Construction";

export const ServiceListItem = ({ serviceList }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

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
      console.log(selectedId);
    }
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    handleClose(e);
    console.log(selectedId);
    navigate(`/mypage/serviceList/update`);
  };

  return (
    <>
      <Container>
        {serviceList.map((data, index) => (
          <Grid
            container
            key={index}
            sx={{
              mt: 2,
              backgroundColor: "#F9F9F9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ConstructionIcon sx={{ fontSize: "40px" }} />
            </Grid>
            <Grid item xs={7}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#9A9A9A",
                }}
              >
                {data.serviceName}
              </Typography>
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
                <MenuItem onClick={(e) => handleUpdate(e)}>수정</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};
