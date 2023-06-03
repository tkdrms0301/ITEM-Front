import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Card,
} from "@mui/material";
import { is } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";

export const EstimateComment = ({ completed, data, handleData, isHistory }) => {
  function isBase64Encoded(data) {
    const base64Regex = /^data:(.*?);base64,/;

    return base64Regex.test(data);
  }

  const alert = () => {
    if (completed.isCompleted) {
      //견적 요청
      const formData = new FormData();

      const imageData = data.requestImg;
      const uniqueId = uuidv4();

      // Base64로 올바르게 인코딩된 문자열인 경우에만 처리
      if (isBase64Encoded(imageData)) {
        const base64Data = imageData;
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let j = 0; j < byteCharacters.length; j++) {
          byteArrays[j] = byteCharacters.charCodeAt(j);
        }

        const blob = new Blob([byteArrays], { type: "image/png" });
        const fileName = `${uniqueId}.jpg`;
        formData.append("requestImg", blob, fileName);
      }

      formData.append("comment", data.comment || "");
      formData.append("productId", data.product);
      formData.append("repairShopId", data.repairShopId);

      post(BaseUrl + "/api/repair/estimate/regist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {});
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
          {isHistory ? (
            <TextField
              variant="standard"
              name="comment"
              value={data.description}
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
              readOnly={isHistory ? true : false}
            ></TextField>
          ) : (
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
              readOnly={isHistory ? true : false}
            ></TextField>
          )}
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
          {isHistory ? null : (
            <Button
              fullWidth
              variant="contained"
              color="inherit"
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
