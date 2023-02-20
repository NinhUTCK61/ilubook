import React from "react";
import Banner from "../component/Home/Banner";
import Feature from "../component/Home/Feature";
import Feedback from "../component/Home/Feedback";
import LatestProduct from "../component/Home/LatestProduct";
import Slider from "../component/Home/Slider";
import TopProduct from "../component/Home/TopProduct";

const Home = () => {
  return (
    <>
      <Slider />
      <Feature />
      <LatestProduct />
      <Banner />
      <TopProduct />
      <Feedback />
    </>
  );
};

export default Home;
