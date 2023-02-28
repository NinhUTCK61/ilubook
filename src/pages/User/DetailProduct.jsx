import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInfoProduct } from "../../api/product";
import BreadcurmHeader from "../../component/Product/BreadcurmHeader";
import ProductDetail from "../../component/Product/ProductDetail";
import RelatedProduct from "../../component/Product/RelatedProduct";

const DetailProduct = () => {
  const { id } = useParams();
  const [infoProduct, setInfoProduct] = useState([]);
  useEffect(() => {
    const fetchInfoProduct = async () => {
      try {
        const data = await getInfoProduct(id);
        setInfoProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfoProduct();
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
