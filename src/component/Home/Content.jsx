import "./home.css";
import Slider from "./Slider.js";
import Feature from "./Feature";
import Banner from "./Banner";
import Feedback from "./Feedback";
import LatestProduct from "./LatestProduct";
import TopProduct from "./TopProduct";

export default function content() {
  return (
    <div className="content">
      <Slider />
      <Feature />
      <LatestProduct />
      <Banner />
      <TopProduct />
      <Feedback />
    </div>
  );
}
