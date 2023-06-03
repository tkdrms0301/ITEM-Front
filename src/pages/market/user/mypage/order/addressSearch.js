import {
  Box,
  Button,
  Container,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export const AddressSearch = ({ dialogStatus, setStatus, setAddress }) => {
  const [value, setValue] = useState("");
  const [detail, setDetail] = useState("");
  return (
    <>
      <Dialog
        open={dialogStatus}
        onClose={() => {
          setStatus(false);
        }}
        fullWidth>
        <Container>
          <DaumPostcode
            autoClose={false}
            onComplete={(data) => {
              setValue(data.roadAddress);
            }}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            상세 주소 입력
          </Typography>
          <TextField
            fullWidth
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}></TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 3,
            }}>
            <Button
              variant="contained"
              onClick={() => {
                setStatus(false);
              }}
              sx={{ width: "45%", borderRadius: "0px" }}>
              취소
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (value === "") {
                  alert("주소 검색을 통해 주소를 선택해 주세요.");
                  return;
                }
                setAddress(value + (detail === "" ? "" : " " + detail + " "));
                setStatus(false);
              }}
              sx={{ width: "45%", borderRadius: "0px" }}>
              확인
            </Button>
          </Box>
        </Container>
      </Dialog>
    </>
  );
};
