import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export const Point = ({ point }) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "5%",
        backgroundColor: "#64B5F6",
        borderRadius: "5px",
        width: "90%",
        p: "3%",
        borderBottom: "2px solid #C6E9FA",
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "20px",
              pl: "3%",
              fontWeight: "bold",
              color: "#EFE5D8",
            }}
          >
            ITEM 포인트
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              pl: "3%",
              textAlign: "right",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {point} point
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
