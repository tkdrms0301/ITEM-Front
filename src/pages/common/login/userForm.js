import {
  Container,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const signInSubmit = () => {
    console.log(idRef.current.value);
    console.log(passwordRef.current.value);

    window.localStorage.setItem(
      "user",
      JSON.stringify({
        memberId: 1,
        name: "홍길동",
        roleType: "MEMBER",
      })
    );

    window.location.replace("/");
  };

  const boxList = [
    {
      name: "id",
      ref: idRef,
      id: "id",
      label: "아이디",
      type: "id",
    },
    {
      name: "password",
      ref: passwordRef,
      id: "password",
      label: "비밀번호",
      type: "password",
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        width: "80%",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        p: 0,
        pt: 2,
      }}
    >
      <CssBaseline />
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {boxList.map((data, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                name={data.name}
                variant="outlined"
                id={data.id}
                required
                inputRef={data.ref}
                label={data.label}
                type={data.type}
                sx={{ width: "80%" }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={signInSubmit}
            sx={{ width: "80%", mt: 2 }}
          >
            로그인
          </Button>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Link href="/sign" variant="body2">
              아이디가 없습니까? 회원가입
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
