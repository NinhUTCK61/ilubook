import { API } from ".";

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

// Delete Category
const deleteCategory = async payload => {
  try {
    const res = await API.post("/category/delete-category", payload);
    return res;
  } catch (error) {
    return error;
  }
};

export { createCategory, getListCategory, searchCategory, deleteCategory };
