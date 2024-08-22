import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthenticateButton from "../../../components/common/AuthenticateButton";
import companyLogo from "../../../assets/CompanyLogo.png";
import dashBoardImage from "../../../assets/dashBoardImage.svg";
import copyRightImage from "../../../assets/copyRightImage.svg";
import { Constants } from "../../../constants/Constant";
import "./login.css";
import { formValidationSchema } from "../../../Services/Functions";
import { END_POINT_LOGIN } from "../../../Services/Api/EndPoints";
import { useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  password: "",
  clientKey: "FirebolttS",
};

const LoginForm = () => {
  const { errors, setFieldError } = useFormikContext();
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        Object.keys(errors).forEach((field) => setFieldError(field, ""));
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [errors, setFieldError]);
  return null;
};

const useActivityTimeout = (callback, timeout) => {
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    const resetTimer = () => setLastActivity(Date.now());

    events.forEach((event) => window.addEventListener(event, resetTimer));

    const interval = setInterval(() => {
      if (Date.now() - lastActivity >= timeout) {
        callback();
      }
    }, 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [lastActivity, timeout, callback]);

  return lastActivity;
};

const Login = () => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [authToken, setAuthToken] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authKey");
    setAuthToken(null);
    navigate("/login");
  };

  useActivityTimeout(handleLogout, 80 * 60 * 1000); // 20 minutes

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch(END_POINT_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      if (response.ok) {
        sessionStorage.setItem("authKey", responseData.authKey);
        setAuthToken(responseData.authKey);
        navigate("/repairdashboard");
      } else {
        setFieldError("userName", responseData.message);
        setGeneralErrorMessage(Constants.IncorrectErrorMessage);
      }
    } catch (error) {
      setGeneralErrorMessage(Constants.errorOccured);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <LoginForm />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: "100vh",
              padding: isSmallDevice ? 0 : "2rem",
             
            }}
          >
            {/* company logo  and input fields*/}
            <Grid item xs={12} sm={10} md={8} lg={5} className="formContainer">
              <Grid container spacing={2} className="formElements">
                {/* company logo */}
                <Grid item xs={12}>
                  <img
                    src={companyLogo}
                    alt="companyLogo"
                    className="companyLogoImage"
                  />
                </Grid>
            {/* welcome to Login */}
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    {Constants.LoginAccount}
                  </Typography>
                </Grid>

                {generalErrorMessage && (
                  <Grid item xs={12}>
                    <Alert severity="error">{generalErrorMessage}</Alert>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <InputLabel htmlFor="userName" className="inputText">
                    {Constants.userName}
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="userName"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                    // FormHelperTextProps={{
                    //   style: { textAlign: "left", margin: "0rem" },
                    // }}
                    // sx={{backgroundColor:'red'}}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel htmlFor="password" className="inputText">
                    {Constants.password}
                  </InputLabel>

                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    FormHelperTextProps={{
                      style: { textAlign: "left", margin: "0rem" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} container className="rememberMe">
                  <Grid item xs={6} className="inputText">
                    <FormControlLabel
                      control={<Checkbox />}
                      label={Constants.rememberMe}
                    />
                  </Grid>

                  <Grid item xs={6} className="forgotPasswordText">
                    <Typography variant="body2">
                      <Link to="/forgot-password" className="forgot-btn">
                        {Constants.forgotPassword}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <AuthenticateButton type="submit" name="login" />
                </Grid>

                {isSmallDevice && (
                  <Grid item xs={12} className="poweredByText">
                    <Typography variant="body2" gutterBottom>
                      {Constants.poweredBy}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* images */}
            {!isSmallDevice && (
              <Grid
                item
                xs={12}
                sm={10}
                md={8}
                lg={7}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  className="serviceNameText"
                  gutterBottom
                >
                  {Constants.nuralService}
                </Typography>
                <br />
                <img src={dashBoardImage} alt="Dashboard" />
                <br />
                <img src={copyRightImage} alt="copyRightImage" />
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
