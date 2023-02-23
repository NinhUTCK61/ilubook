import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cart from "../pages/Cart";
import DetailProduct from "../pages/DetailProduct";
import Home from "../pages/Home";

export const listMenu = [
  {
    key: "home",
    name: "Home",
    link: "/",
    isStyle: false,
    subMenu: [],
  },
  {
    key: "our-shop",
    name: "Our Shop",
    link: "/shop",
    isStyle: false,
    subMenu: [
      {
        key: "bread",
        name: "Breads",
        link: "/",
      },
      {
        key: "bread-tools",
        name: "Breads Tools",
        link: "/",
      },
      {
        key: "finding",
        name: "Finding",
        link: "/",
      },
      {
        key: "chains",
        name: "Chains",
        link: "/",
      },
      {
        key: "charms-and-pedants",
        name: "Charms and Pedants",
        link: "/",
      },
      {
        key: "bridal-accessories",
        name: "Bridal Accessories",
        link: "/",
      },
      {
        key: "equiment-hire",
        name: "Equipment Hire",
        link: "/",
      },
      {
        key: "keyholder",
        name: "Keyholder",
        link: "/",
      },
      {
        key: "bags",
        name: "Bags",
        link: "/",
      },
    ],
  },
  {
    key: "on-sale",
    name: "On Sale",
    link: "/",
    isStyle: true,
    subMenu: [],
  },
  {
    key: "our-service",
    name: "Our Services",
    link: "/",
    isStyle: false,
    subMenu: [],
  },
  {
    key: "blog",
    name: "Blog",
    link: "/",
    isStyle: false,
    subMenu: [],
  },
  {
    key: "contact",
    name: "Contact",
    link: "/",
    isStyle: false,
    subMenu: [],
  },
];

export const listNotAuthMenu = [
  {
    key: "sign-in",
    name: "Signin",
    link: "/login",
    isStyle: false,
    subMenu: [],
  },
  {
    key: "sign-up",
    name: "Signup",
    link: "/register",
    isStyle: false,
    subMenu: [],
  },
];

export const listAuthMenu = [
  {
    key: "settings",
    name: "Settings",
    link: "/settings",
  },
  {
    key: "my-order",
    name: "My Orders",
    link: "/my-order",
  },
  {
    key: "log-out",
    name: "Log out",
    link: "/",
  },
];

export const listRouter = [
  {
    key: "product-detail",
    path: "/product-detail/:id",
    component: <DetailProduct />,
  },
  { key: "login-page", path: "/login", component: <Login /> },
  { key: "register-page", path: "/register", component: <Register /> },
  { key: "home-page", path: "/", component: <Home /> },
  { key: "card", path: "/cart", component: <Cart /> },
  { key: "other-page", path: "/*", component: <Home /> },
];

export const listHomeSlide = [
  {
    key: "slide-1",
    background: "assets/img/slider-1.webp",
    title: "Beads",
    description:
      "We have a wide range of beads from hair beads, necklaces,bracelets etc",
    price: "00.50",
    index: "1",
  },
  {
    key: "slide-1",
    background: "assets/img/slider-2.webp",
    title: "Event planning and Management",
    description: `We do event planning management for all different types of
    events from <br /> weddings, birthdays ,coopera...`,
    price: "25.50",
    index: "2",
  },
];
