import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  snackbar: {
    open: false,
    severity: "",
    message: "",
  },
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    startLoading: state => {
      state.loading = true;
    },
    endLoading: state => {
      state.loading = false;
    },
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },

    closeSnackBar(state) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
  },
});

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(statusSlice.actions.closeSnackBar());
};

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      statusSlice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(statusSlice.actions.closeSnackBar());
    }, 4000);
  };

export const { startLoading, endLoading } = statusSlice.actions;

export default statusSlice.reducer;
