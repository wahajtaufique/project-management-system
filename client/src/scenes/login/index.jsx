import { Box, Grid, Button, TextField, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LoginIcon from '@mui/icons-material/Login';
import { Navigate } from "react-router-dom";
import { loginUser, resetUserStates } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const myApp = useSelector(state => state.myApp);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const handleFormSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (myApp.user?.error) {
      setError(myApp.user.error);
      setSuccess("");
      setTimeout(() => {
        setError("");
        dispatch(resetUserStates());
      }, 3000);
    }
    if (myApp.user.success) {
      setSuccess(myApp.user.success);
      setError("");
      setTimeout(() => {
        setSuccess("");
        dispatch(resetUserStates());
      }, 3000)
    }
  }, [myApp.user])

  // If authenticated, navigate to Dashboard
  if (!!localStorage.getItem("authUser")) {
    return <Navigate replace to="/" />
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={4} sx={{border: '1px solid white', borderRadius: '5px'}} p='20px'>
      {success && (
        <Alert variant="outlined" severity="success">{success}</Alert>
      )}
      {error && (
        <Alert variant="outlined" severity="error">{error}</Alert>
      )}
        <Box m="20px">
          <Header title="LOGIN" subtitle="Enter your credentials to proceed" />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Box>
                    <Button
                      type="submit" color="secondary" variant="contained"
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                      }}
                    >
                      Sign In
                      <LoginIcon sx={{ ml: "10px" }} />
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required('no password provided.')
    .min(8, 'password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'password can only contain letters.')
});

const initialValues = {
  email: "",
  password: ""
};

export default Login;
