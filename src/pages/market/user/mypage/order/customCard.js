import { Card, CardHeader, Grid, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const CustomCard = ({ title, content, action }) => {
  return (
    <Card sx={{ p: 0, pb: 1, boxShadow: 10, width: "100%" }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h3" }}
        sx={{ mt: -2 }}
      />
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={action === null ? 11 : 9}
          display={"flex"}
          alignItems={"center"}
        >
          {content}
        </Grid>
        {action === null ? null : (
          <Grid
            item
            xs={2}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <IconButton onClick={action}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
