import axios from "axios";
const baseUrl = "http://localhost:8800/api/v1";

// Get List Product
const getListProduct = async () => {
  try {
    const res = await axios.get(baseUrl + "/product");
    return res;
  } catch (error) {
    return error;
  }
};

// Get Info Detail Product
const getInfoProduct = async id => {
  try {
    const res = await axios.get(baseUrl + "/product/" + id);
    return res;
  } catch (error) {
    return error;
  }
};

export { getListProduct, getInfoProduct };
