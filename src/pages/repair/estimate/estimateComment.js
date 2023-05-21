import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EstimateComment = ({ completed, data, handleData }) => {
  const alert = () => {
    if (completed.isCompleted) {
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ width: "100%" }}>
        <Card
          variant="outlined"
          sx={{
            pb: 1,
            boxShadow: 10,
          }}
        >
          <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
            사진 상세 설명 *
          </Typography>
          <TextField
            variant="standard"
            name="comment"
            value={data.comment}
            onChange={handleData}
            placeholder="예 : 카메라 부분이 파손되었고,
액정에 금이 가있습니다."
            fullWidth
            multiline
            rows={2}
            sx={{ m: "3%" }}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          ></TextField>
        </Card>
      </Container>
      <Container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {"신청" == null ? null : (
            <Button
              fullWidth
              variant="contained"
              onClick={alert}
              sx={{
                mt: 3,
                backgroundColor: "ButtonFace",
                color: "ButtonText",
              }}
            >
              수리견적 요청하기
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
};
