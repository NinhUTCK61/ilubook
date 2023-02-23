import { API } from ".";

// Get List Product
const getListProduct = async () => {
  try {
    const res = await API.get("/product");
    return res;
  } catch (error) {
    return error;
  }
};

// Get Info Detail Product
const getInfoProduct = async id => {
  try {
    const res = await API.get("/product/" + id);
    return res;
  } catch (error) {
    return error;
  }
};

export { getListProduct, getInfoProduct };
