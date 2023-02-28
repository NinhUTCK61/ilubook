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

// Search
const searchProduct = async search => {
  try {
    const res = await API.get("/product/search?title=" + search);
    return res;
  } catch (error) {
    return error;
  }
};

// Create
const createProduct = async payloads => {
  try {
    const res = await API.post("/product/", payloads);
    return res;
  } catch (error) {
    return error;
  }
};

// Update
const updateProduct = async (payloads, id) => {
  try {
    const res = await API.put("/product/" + id, payloads);
    return res;
  } catch (error) {
    return error;
  }
};

// addToCategory
const addToCategory = async payload => {
  try {
    const res = await API.post("/product/add-to-category", payload);
    return res;
  } catch (error) {
    return error;
  }
};

// Delete Product
const deleteProduct = async payload => {
  try {
    const res = await API.post("/product/delete-product", payload);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  getListProduct,
  getInfoProduct,
  deleteProduct,
  searchProduct,
  createProduct,
  updateProduct,
  addToCategory,
};
