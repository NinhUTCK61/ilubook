import styled from "@emotion/styled";
import { Container, Stack } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

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
  // const [email, setEmail] = useState("");

  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/api/login", {
        // email: email,
        // password: password,
      })
      .then(res => {
        let user = res["data"]["user"];
        let token = res["data"]["token"];
        if (token !== false) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/", { state: { data: token } });
        } else {
          alert("dang nhap that bai");
        }
      });
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
                <InputText placeholder="Name" />
              </InputtFiled>
              <InputtFiled>
                <MdEmail />
                <InputText placeholder="Email Address" />
              </InputtFiled>
              <InputtFiled>
                <GoKey />
                <InputText placeholder="Password" />
              </InputtFiled>
              <InputtFiled
                style={{
                  border: "1px solid #007bff",
                }}
              >
                <GoKey />
                <InputText placeholder="Confirm Password" />
              </InputtFiled>
              <ReCAPTCHA
                sitekey="6LeKfKIkAAAAACGmWsm6YctTQnVd7-5yCowmtj70"
                onChange={() => console.log("hello")}
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
                onClick={handleLogin}
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
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
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
