import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Container, Stack, Button } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { signUp } from "../../api/auth";
import { auth, provider } from "../../helper/firebase";
import { signInWithPopup } from "firebase/auth";
import { signInWithGoogle } from "../../api/auth";
import Cookies from "js-cookie";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import { showSnackbar } from "../../redux/statusSlice";
import { errorSystem } from "../../data";

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

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [isRobot, setIsRobot] = useState(false);

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfimPassword("");
  };

  const handleRegister = async () => {
    if (isRobot) {
      if (!name || !email || !password || !confimPassword) {
        dispatch(
          showSnackbar({
            severity: "warning",
            message: "Bạn phải nhập đầy đủ các trường để tạo tài khoản",
          })
        );
      } else {
        try {
          if (password !== confimPassword) {
            setPassword("");
            setConfimPassword("");
            dispatch(
              showSnackbar({
                severity: "warning",
                message: "Mật khẩu nhập lại không khớp",
              })
            );
          } else {
            const data = await signUp({
              name,
              email,
              password,
            });
            handleReset();
            if (data.data.status === 200) {
              dispatch(
                showSnackbar({
                  severity: "success",
                  message: data.data.message,
                })
              );
            } else {
              dispatch(
                showSnackbar({
                  severity: "error",
                  message: data.data.message,
                })
              );
            }
          }
        } catch (error) {
          dispatch(showSnackbar(errorSystem));
        }
      }
    } else {
      dispatch(
        showSnackbar({
          severity: "warning",
          message: "Bạn chưa xác thực người máy",
        })
      );
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const infoEmail = await signInWithPopup(auth, provider);
      const data = await signInWithGoogle({
        name: infoEmail.user.displayName,
        email: infoEmail.user.email,
      });
      Cookies.set("access_token", data.data.token);
      dispatch(loginSuccess(data.data));
      handleReset();
      navigate("/");
    } catch (error) {
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
              Create an account
            </div>

            <div
              style={{
                padding: "16px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <InputtFiled>
                <FaUserAlt />
                <InputText
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </InputtFiled>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </InputtFiled>
              <InputtFiled
                style={{
                  border: "1px solid #007bff",
                }}
              >
                <GoKey />
                <InputText
                  type="password"
                  placeholder="Confirm Password"
                  value={confimPassword}
                  onChange={e => setConfimPassword(e.target.value)}
                />
              </InputtFiled>
              <ReCAPTCHA
                sitekey="6LchWqgkAAAAADjS7iMnLoqtNHVlR_96Q4-Vu4gt"
                onChange={() => setIsRobot(true)}
              />
              ,
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
                onClick={handleRegister}
              >
                Sign - up
              </Button>
              <div
                style={{
                  marginTop: "16px",
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                or register with
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
                  Already have an account?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login Here
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
