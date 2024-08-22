import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import AuthenticateButton from "../../../components/common/AuthenticateButton";
import CompanyLogo from "../../../assets/CompanyLogo.png";
import dashBoardImage from "../../../assets/dashBoardImage.svg";
import copyRightImage from "../../../assets/copyRightImage.svg";
import { Constants } from "../../../constants/Constant";
import * as Yup from "yup";
import "./forgotPassword.css";
// import { forgotPassword } from "../../../Services/Api/EndPoints";
import { forgotPassword } from "../../../API service/APIservice";
 
const initialState = {
  userName: "",
  emailId: "",
  clientKey: "FirebolttS",
};
 
const ForgotPassword = () => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("(max-width:600px)");
  const [showAlert, setShowAlert] = useState(false);
  const [generalError, setGeneralError] = useState("");
 
  const validationSchema = Yup.object().shape({
    emailId: Yup.string().email("Invalid email address"),
  });
 
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (!values.userName && !values.emailId) {
      setShowAlert(true);
      setSubmitting(false);
      return;
    }
    setShowAlert(false);
    setGeneralError("");
 
    try {
      const response = await forgotPassword(
        values.userName,
        values.emailId,
        values.clientKey
      );
 
      if (response.statusCode === "200") {
        console.log("Password sent on your email");
        navigate("/login");
      } else {
        if (response.emailId && response.emailId !== values.emailId) {
          setFieldError("emailId", "Email ID not registered.");
        } else if (response.statusMessage) {
          setGeneralError(response.statusMessage);
        } else {
          setGeneralError(Constants.IncorrectErrorMessage);
        }
      }
    } catch (error) {
      setGeneralError("Something went wrong");
    }
    setSubmitting(false);
  };
 
  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, isSubmitting, errors }) => (
        <Form>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh", padding: isSmallDevice ? 0 : "2rem" }}
          >
            <Grid item xs={12} sm={10} md={8} lg={5} className="formContainer">
              <Grid container spacing={2} className="formElements">
                <Grid item xs={12}>
                  <img
                    src={CompanyLogo}
                    alt="companyLogo"
                    className="companyLogoImage"
                  />
                </Grid>
 
                {showAlert && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      Please fill in at least one field.
                    </Alert>
                  </Grid>
                )}
 
                {generalError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{generalError}</Alert>
                  </Grid>
                )}
 
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    {Constants.getYourPassword}
                  </Typography>
                </Grid>
 
                <Grid item xs={12}>
                  <InputLabel htmlFor="userName" className="inputText">
                    {Constants.enterUserName}
                  </InputLabel>
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      fullWidth
                      name="userName"
                      id="userName"
                      value={values.userName}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </FormControl>
                </Grid>
 
                <div className="or-text">{Constants.orText}</div>
 
                <Grid item xs={12}>
                  <InputLabel htmlFor="emailId" className="inputText">
                    {Constants.enterEmail}
                  </InputLabel>
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      fullWidth
                      name="emailId"
                      id="emailId"
                      value={values.emailId}
                      onChange={handleChange}
                      autoComplete="email"
                      error={Boolean(errors.emailId)}
                      helperText={errors.emailId}
                    />
                  </FormControl>
                </Grid>
 
                <Grid item xs={12} container className="rememberMe">
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6} className="forgotPasswordText">
                    <Typography>
                      <Link to="/login" className="back-btn">
                        {Constants.backBtn}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
 
                <Grid item xs={12}>
                  <AuthenticateButton
                    type="submit"
                    name="Submit"
                    disabled={isSubmitting}
                  />
                </Grid>
              </Grid>
            </Grid>
 
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
 
export default ForgotPassword;
 
 