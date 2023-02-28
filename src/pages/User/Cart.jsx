import React, { useEffect } from "react";
import Cash from "../../component/Cart/Cash.jsx";
import Introduce from "../../component/Cart/Introduce.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Cash currentUser={currentUser} />
      <Introduce />
    </>
  );
};

export default Cart;
