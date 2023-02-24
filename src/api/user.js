import { API } from ".";

// Get List Product
const addToCart = async payload => {
  try {
    const res = await API.put("/users/add-to-cart", payload);
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

export { addToCart, getInfoUser };
