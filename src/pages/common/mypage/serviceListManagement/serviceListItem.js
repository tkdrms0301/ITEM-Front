import { Card, Container, Grid, Typography } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConstructionIcon from "@mui/icons-material/Construction";
import { remove } from "../../../../api";
import { Box } from "@mui/system";
import palette from "../../../../theme/palette";

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
      remove("http://itemserverapi.azurewebsites.net/api/repair/serviceList", {
        params: {
          serviceId: selectedId,
        },
      })
        .then((response) => {
          if (response.data) {
            window.location.reload("/mypage/serviceList/panel");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpdate = (e) => {
    handleClose(e);

    navigate(
      {
        pathname: "/mypage/serviceList/update",
      },
      { state: { selectedId: selectedId } }
    );
  };

  return (
    <>
      <Container sx={{ mt: 3, pb: 20 }}>
        {serviceList.map((service, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 10,
              my: 1,
              borderRadius: "5px",
              py: 1,
              pl: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                borderBottom: "2px solid #f1f1f1",
                pb: 2,
              }}
            >
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h5">{service.serviceName}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {service.description}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    aria-label="more"
                    aria-controls={`more-menu-${service.serviceId}`}
                    aria-haspopup="true"
                    onClick={(e) => handleMenuOpen(e, service.serviceId)}
                  >
                    <MoreVertIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                  <Menu
                    id={`more-menu-${service.serviceId}`}
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
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: palette.error.main, mt: 0.5 }}
              >
                설정 가격
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {service.servicePrice.toLocaleString()}원
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Container>
    </>
  );
};
