import {
  Container,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";

export const RepairForm = ({ roleType }) => {
  
  const emailRef = useRef(null);
  const nickName = useRef(null);
  const password = useRef(null);
  const passwordVali = useRef(null);

  const validateEmail = (e) => {
    console.log(emailRef.current.value);
  };
  const validateNickname = (e) => {
    console.log(nickName.current.value);
  };

  const signUpSubmit = () => {
    console.log(roleType);
    console.log(emailRef.current.value);
    console.log(nickName.current.value);
    console.log(password.current.value);
    console.log(passwordVali.current.value);
  };

  const boxList = [
    {
      name: "email",
      ref: emailRef,
      id: "email",
      label: "Email Address",
      type: "email",
      vali: validateEmail,
    },
    {
      name: "nickName",
      ref: nickName,
      id: "nickName",
      label: "Nick Name",
      type: "nickName",
      vali: validateNickname,
    },
    {
      name: "password",
      ref: password,
      id: "password",
      label: "password",
      type: "password",
    },
    {
      name: "password-validate",
      ref: passwordVali,
      id: "password-validate",
      label: "Confirm Password",
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
      <form>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {boxList.map((data, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                name={data.name}
                variant="outlined"
                id={data.id}
                inputRef={data.ref}
                label={data.label}
                type={data.type}
                sx={{ width: "60%" }}
              />
              {data.name === "email" || data.name === "nickName" ? (
                <Button variant="outlined" sx={{ ml: 2 }} onClick={data.vali}>
                  중복확인
                </Button>
              ) : null}
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={signUpSubmit}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link href="/login" variant="body2">
              이미 아이디가 있습니까? 로그인
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
