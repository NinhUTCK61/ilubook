import { API } from ".";

// Get Info Detail Product
const getInfoCategory = async id => {
  try {
    const res = await API.get("/category/" + id);
    return res;
  } catch (error) {
    return error;
  }
};

// Create
const createCategory = async payloads => {
  try {
    const res = await API.post("/category/", payloads);
    return res;
  } catch (error) {
    return error;
  }
};

// Get List Category
const getListCategory = async () => {
  try {
    const res = await API.get("/category");
    return res;
  } catch (error) {
    return error;
  }
};

// Search Category
const searchCategory = async search => {
  try {
    const res = await API.get("/category/search?title=" + search);
    return res;
  } catch (error) {
    return error;
  }
};

// Update
const updateCategory = async (payloads, id) => {
  try {
    const res = await API.put("/category/" + id, payloads);
    return res;
  } catch (error) {
    return error;
  }
};

// Delete Category
const deleteCategory = async payload => {
  try {
    const res = await API.post("/category/delete-category", payload);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  createCategory,
  getListCategory,
  searchCategory,
  deleteCategory,
  getInfoCategory,
  updateCategory,
};
