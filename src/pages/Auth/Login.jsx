import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Container,
  Link,
  Stack,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { auth, provider } from "../../helper/firebase";
import { signInWithPopup } from "firebase/auth";
import { signIn, signInWithGoogle } from "../../api/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { addToCartSuccess } from "../../redux/productSlice";

const ImgCardLogin = styled("div")(({ theme }) => ({
  backgroundImage: "url(assets/img/img-card-login.jpg)",
  backgroundPosition: "top center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "45%",
  borderTopLeftRadius: "15px",
  borderBottomLeftRadius: "15px",
}));

const CardBody = styled("div")(({ theme }) => ({
  padding: "32px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "55%",
  border: "1px solid rgba(0,0,0,.125)",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  boxSizing: "border-box",
}));

const InputtFiled = styled("div")(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
  height: "45px",
  border: "1px solid #00000020",
  borderRadius: "5px",
  padding: "6px 0",
  paddingLeft: "15px",
  paddingRight: "12px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  transition: "all ease-in-out .15s",
  svg: {
    color: "#f51167",
    fontSize: "20px",
  },
  "&:focus-within": {
    border: "1px solid #007bff",
    boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)",
  },
}));

const InputText = styled("input")(({ theme }) => ({
  marginLeft: "15px",
  width: "100%",
  height: "100%",
  outline: "none",
  border: "none",
  color: "#495057",
  fontSize: "1rem",
  fontWeight: 400,
}));

const Remember = styled("div")(({ theme }) => ({
  position: "relative",
  width: "85%",
}));

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const data = await signIn({ email, password });
      Cookies.set("access_token", data.data.token);
      dispatch(loginSuccess(data.data));
      dispatch(addToCartSuccess(data.data.cart));
      handleReset();
      navigate(-1);
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      const infoEmail = await signInWithPopup(auth, provider);
      const data = await signInWithGoogle({
        name: infoEmail.user.displayName,
        email: infoEmail.user.email,
      });
      Cookies.set("access_token", data.data.token);
      dispatch(loginSuccess(data.data));
      dispatch(addToCartSuccess(data.data.cart));
      handleReset();
      navigate(-1);
    } catch (error) {
      dispatch(loginFailure());
      console.log(console.error());
    }
  };

  return (
    <div className="login">
      <Container>
        <Stack
          direction={{ xs: "row", sm: "row", md: "row" }}
          sx={{ display: { borderRadius: "20px" } }}
        >
          <ImgCardLogin
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          ></ImgCardLogin>
          <CardBody>
            <div
              className="title-login"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Login to your account
            </div>

            <div
              style={{
                padding: "16px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <InputtFiled>
                <MdEmail />
                <InputText
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </InputtFiled>

              <InputtFiled>
                <GoKey />
                <InputText
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </InputtFiled>

              <Remember>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked
                      sx={{
                        "&.Mui-checked": {
                          color: "#f51167",
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{ position: "absolute", left: "0" }}
                />
              </Remember>
              <Button
                variant="contained"
                sx={{
                  background: "#f51167",
                  width: "100%",
                  marginTop: "10px",
                  padding: "12px 0",
                  borderRadius: "5px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                type="button"
                onClick={handleLogin}
              >
                Login
              </Button>

              <div
                style={{
                  width: "100%",
                  marginTop: "16px",
                  textAlign: "end",
                }}
              >
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                  to="#"
                >
                  Forgot password ?
                </Link>
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                or login with
              </div>

              <Stack direction="row" sx={{ margin: "16px 0" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    marginRight: "5%",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Facebook
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    background: "#da3f34",
                    width: "50%",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={handleSignInWithGoogle}
                >
                  Google
                </Button>
              </Stack>

              <hr
                style={{
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  margin: "1.5rem 0",
                  marginTop: "40px",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div>
                  Check out as a guest ?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Click Here
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "16px",
                  }}
                >
                  Don't have account ?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register Here
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Stack>
      </Container>
    </div>
  );
}
