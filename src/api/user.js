import { API } from ".";

const addToCart = async payload => {
  try {
    const res = await API.put("/users/add-to-cart", payload);
    return res;
  } catch (error) {
    return error;
  }
};

const updateToCart = async payload => {
  try {
    const res = await API.put("/users/update-to-cart", payload);
    return res;
  } catch (error) {
    return error;
  }
};

const deleteToCart = async payload => {
  try {
    const res = await API.put("/users/delete-to-cart", payload);
    return res;
  } catch (error) {
    return error;
  }
};

// Search Category
const searchUser = async search => {
  try {
    const res = await API.get("/users/search?email=" + search);
    return res;
  } catch (error) {
    return error;
  }
};

// Get Info User
const getInfoUser = async id => {
  try {
    const res = await API.get("/users/find/" + id);
    return res;
  } catch (error) {
    return error;
  }
};

export { addToCart, getInfoUser, updateToCart, deleteToCart, searchUser };
