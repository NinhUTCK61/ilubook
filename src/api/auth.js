import { API } from ".";

const signInWithGoogle = async payload => {
  try {
    const res = await API.post("/auth/google", payload);
    return res;
  } catch (error) {
    return error;
  }
};

const signUp = async payload => {
  try {
    const res = await API.post("/auth/signup", payload);
    return res;
  } catch (error) {
    return error;
  }
};

const signIn = async payload => {
  try {
    const res = await API.post("/auth/signin", payload);
    return res;
  } catch (error) {
    return error;
  }
};

export { signInWithGoogle, signUp, signIn };
