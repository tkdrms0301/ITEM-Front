import { Container, TextField, Typography, Card } from "@mui/material";

export const EstimateComment = ({ completed, data, handleData }) => {
  return (
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
  );
};
