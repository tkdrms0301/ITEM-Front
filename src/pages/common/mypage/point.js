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
        backgroundColor: "#E0E0E0",
        width: "90%",
        p: "3%",
        borderBottom: "2px solid gray",
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h7" sx={{ pl: "3%", fontWeight: "bold" }}>
            ITEM 포인트
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ pl: "3%", textAlign: "right" }}>
            {point} 포인트
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
