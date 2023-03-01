import React, { useMemo } from "react";
import MainLayout from "./layouts/MainLayout";
import { renderRouter } from "./router";
import { BrowserRouter, Routes } from "react-router-dom";
import { Snackbar, Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import "aos/dist/aos.css";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackBar } from "./redux/statusSlice";

const vertical = "top";
const horizontal = "right";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { severity, message, open } = useSelector(
    state => state.status.snackbar
  );
  const { loading } = useSelector(state => state.status);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isPrivate = useMemo(() => {
    return currentUser?.isAdmin || false;
  }, [currentUser]);

  return (
    <BrowserRouter>
      <MainLayout>
        {/* Loading */}
        {loading && (
          <Box sx={{ width: "100%", position: "fixed", top: 0 }}>
            <LinearProgress />
          </Box>
        )}

        {/* Routes */}
        <Routes>{renderRouter(isPrivate)}</Routes>

        {/* Message */}
        {message && open ? (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={4000}
            key={vertical + horizontal}
            onClose={() => {
              dispatch(closeSnackBar());
            }}
          >
            <Alert
              onClose={() => {
                dispatch(closeSnackBar());
              }}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        ) : (
          <></>
        )}
      </MainLayout>
    </BrowserRouter>
  );
}
export default App;
