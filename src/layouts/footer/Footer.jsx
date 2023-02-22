import * as React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import "./footer.css";

const Footer = styled("div")(({ theme }) => ({
  backgroundColor: "#282828",
  color: "#8f8f8f",
  marginTop: "2%",
}));

const FooterTitle = styled("div")(({ theme }) => ({
  textTransform: "uppercase",
  color: "white",
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "25px",
}));

const TextContact = styled("div")(({ theme }) => ({
  color: "#f51167",
  marginRight: "15px",
  marginLeft: "10%",
}));

const TitleLeft = styled("div")(({ theme }) => ({
  width: "45%",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
}));

const Blog = styled("div")(({ theme }) => ({
  width: "50%",
}));

const AboutImg = styled("div")(({ theme }) => ({
  width: "100%",
}));

const StyleUserLink = styled("div")(({ theme }) => ({
  "&:first-of-type": {
    marginTop: 0,
  },
  marginTop: "10%",
  "&:hover": {
    color: "#fff",
    cursor: "pointer",
  },
  fontSize: "14px",
  color: "#8f8f8f",
}));

const BlogImg = styled("div")(({ theme }) => ({
  marginTop: "8%",
  "&:first-of-type": {
    marginTop: 0,
  },
}));

const BlogTitle = styled("div")(({ theme }) => ({
  color: "#fff",
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: 1.2,
}));

const BlogRight = styled("div")(({ theme }) => ({
  paddingTop: "2px",
}));

const BlogYear = styled("div")(({ theme }) => ({
  fontSize: "12px",
  marginBottom: "4px",
  fontWeight: 600,
  lineHeight: 1.5,
}));

const BlogReadmore = styled("div")(({ theme }) => ({
  color: "#f51167",
  fontSize: "12px",
  lineHeight: 1.5,
}));

const EnterYourMail = styled("div")`
  width: 90%;
  margin: 14px 0;
  background-color: #ffffff;
  padding: 8px 0;
  padding-left: 10px;
  padding-right: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  span {
    color: #f51167;
    font-weight: 700;
    font-size: 12px;
  }
`;

const InputMail = styled("input")`
  background-color: #ffffff;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 400;
`;

const ListIcon = styled("div")`
  padding-top: 5px;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const IconItem = styled("div")`
  display: flex;
  align-items: center;
  svg {
    color: #d7d7d7;
    font-size: 30px;
    margin-right: 16px;
    transition: all ease 0.3s;
  }
  span {
    text-transform: uppercase;
    color: #9f9fa0;
    font-size: 12px;
    font-weight: 600;
    transition: all ease 0.3s;
  }
  &:hover {
    span,
    svg {
      color: #fff;
    }
  }
`;

export default function FooterMainLayout() {
  return (
    <Footer>
      <Container sx={{ paddingTop: "20px" }}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            display: { xs: "flex", md: "flex", justifyContent: "space-around" },
          }}
        >
          <TitleLeft>
            <Stack
              direction={{ md: "row" }}
              spacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                display: {
                  sm: "flex",
                  md: "flex",
                  justifyContent: "space-around",
                },
              }}
            >
              <Blog>
                <FooterTitle>ABOUT</FooterTitle>
                <Typography
                  sx={{
                    display: {
                      textAlign: "justify",
                      fontSize: "14px",
                      color: "#8f8f8f",
                      marginBottom: "25px",
                    },
                  }}
                >
                  Online & physical bead shop with the best beads and beading
                  supplies in Zimbabwe ✓ Over 9000 beads for jewelry making ✓
                  Glass beads ✓ Beading supplies and much more!
                </Typography>

                <AboutImg>
                  <img
                    src="/assets/img/card-about-footer.png"
                    alt="card"
                    width="90%"
                  />
                </AboutImg>
                <EnterYourMail>
                  <InputMail placeholder="Enter e-mail" />
                  <span>SUBCRIBE</span>
                </EnterYourMail>
              </Blog>
              <Blog>
                <FooterTitle sx={{ marginLeft: "10%" }}>
                  USEFUL LINKS
                </FooterTitle>
                <Stack
                  direction={{ md: "row", justifyContent: "space-around" }}
                >
                  <Box sx={{ display: { width: "45%", marginLeft: "10%" } }}>
                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      About us
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Track Orders
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Shipping
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Contact
                    </StyleUserLink>
                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      My Orders
                    </StyleUserLink>
                  </Box>
                  <Box sx={{ display: { width: "45%" } }}>
                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Support
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Terms of Use
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Privacy Policy
                    </StyleUserLink>

                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Our Services
                    </StyleUserLink>
                    <StyleUserLink href="#">
                      <FiberManualRecordIcon
                        sx={{
                          display: {
                            fontSize: "10px",
                            color: "#ec105a",
                            marginRight: "14px",
                          },
                        }}
                      />
                      Blog
                    </StyleUserLink>
                  </Box>
                </Stack>
              </Blog>
            </Stack>
          </TitleLeft>

          <TitleLeft>
            <Stack
              direction={{ md: "row" }}
              spacing={{ xs: 1 }}
              sx={{
                display: {
                  sm: "flex",
                  md: "flex",
                  justifyContent: "space-around",
                },
              }}
            >
              <Blog>
                <FooterTitle>Blog</FooterTitle>

                <Box
                  sx={{
                    display: {
                      md: "flex",
                      sm: "flex",
                      xs: "flex",
                      marginBottom: "30px",
                    },
                  }}
                >
                  <BlogImg>
                    <img
                      src="/assets/img/blog-footer.jpg"
                      alt="blog"
                      style={{
                        objectFit: "cover",
                        width: "64px",
                        height: "64px",
                        marginRight: "22px",
                      }}
                    />
                  </BlogImg>

                  <BlogRight>
                    <BlogTitle>BOHE MIAN WEDDING THEME</BlogTitle>
                    <BlogYear>2 years ago</BlogYear>
                    <BlogReadmore href="#">Read more</BlogReadmore>
                  </BlogRight>
                </Box>

                <Box sx={{ display: { md: "flex", sm: "flex", xs: "flex" } }}>
                  <BlogImg>
                    <img
                      src="/assets/img/blog-footer2.jpg"
                      alt="blog"
                      style={{
                        objectFit: "cover",
                        width: "64px",
                        height: "64px",
                        marginRight: "22px",
                      }}
                    />
                  </BlogImg>

                  <BlogRight>
                    <BlogTitle>BOHE MIAN WEDDING THEME</BlogTitle>
                    <BlogYear>1 year ago</BlogYear>
                    <BlogReadmore href="#">Read more</BlogReadmore>
                  </BlogRight>
                </Box>
              </Blog>
              <Blog className="contact">
                <FooterTitle sx={{ marginLeft: "10%" }}>Contact</FooterTitle>

                <Stack
                  direction={{ md: "row" }}
                  sx={{ marginBottom: "1.4rem" }}
                >
                  <TextContact>C.</TextContact>
                  <p style={{ fontSize: "14px", margin: 0 }}>ilubooks</p>
                </Stack>
                <Stack
                  direction={{ md: "row" }}
                  sx={{ marginBottom: "1.4rem" }}
                >
                  <TextContact>B.</TextContact>
                  <p style={{ fontSize: "14px", margin: 0 }}>
                    108 Chinhoyi Street, Central Business District, Harare
                    Zimbabwe
                  </p>
                </Stack>
                <Stack
                  direction={{ md: "row" }}
                  sx={{ marginBottom: "1.4rem" }}
                >
                  <TextContact>T.</TextContact>
                  <p style={{ fontSize: "14px", margin: 0 }}>+263782149840</p>
                </Stack>
                <Stack
                  direction={{ md: "row" }}
                  sx={{ marginBottom: "1.4rem" }}
                >
                  <TextContact>E.</TextContact>
                  <p style={{ fontSize: "14px", margin: 0 }}>
                    rvmseamaf@gmail.com
                  </p>
                </Stack>
              </Blog>
            </Stack>
          </TitleLeft>
        </Stack>
      </Container>
      <div
        style={{
          borderTop: "2px solid #3b3535",
        }}
      ></div>
      <Container>
        <ListIcon>
          <IconItem>
            <AiOutlineInstagram />
            <span>Instagram</span>
          </IconItem>
          <IconItem>
            <BsPinterest />
            <span>Pinterest</span>
          </IconItem>
          <IconItem>
            <FaFacebookF />
            <span>Facebook</span>
          </IconItem>
          <IconItem>
            <AiOutlineTwitter />
            <span>Twitter</span>
          </IconItem>
          <IconItem>
            <AiFillYoutube />
            <span>Youtube</span>
          </IconItem>
          <IconItem>
            <AiFillLinkedin />
            <span>Linkedin</span>
          </IconItem>
        </ListIcon>
        <p
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "14px",
            paddingTop: "46px",
            paddingBottom: "16px",
            margin: 0,
          }}
        >
          Copyright ©2023 All rights reserved | Developed By Eloquent Geeks
        </p>
      </Container>
    </Footer>
  );
}
