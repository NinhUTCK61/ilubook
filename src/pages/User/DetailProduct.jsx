import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoProduct } from "../../api/product";
import BreadcurmHeader from "../../component/Product/BreadcurmHeader";
import ProductDetail from "../../component/Product/ProductDetail";
import RelatedProduct from "../../component/Product/RelatedProduct";
import { startLoading, endLoading } from "../../redux/statusSlice";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [infoProduct, setInfoProduct] = useState([]);
  useEffect(() => {
    const fetchInfoProduct = async () => {
      dispatch(startLoading());
      try {
        const data = await getInfoProduct(id);
        setInfoProduct(data.data);
      } catch (error) {
        console.log(error);
      }
      dispatch(endLoading());
    };
    fetchInfoProduct();
  }, [id, dispatch]);

  // Scoll To Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <BreadcurmHeader title={infoProduct?.title} />
      <ProductDetail infoProduct={infoProduct} />
      <RelatedProduct />
    </>
  );
};

export default DetailProduct;
