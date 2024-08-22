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
    FormHelperText
} from "@mui/material";
import './login.css'

import CompanyLogo from "../../assets/CompanyLogo1.svg";
import dashBoardImage from "../../assets/dashBoardImage.svg";
import copyRightImage from "../../assets/copyRightImage.svg";
import { Link } from "react-router-dom";
import AuthenticateButton from "../common/AuthenticateButton"
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const initialState = {
    userName: "",
    password: "",
};

const formValidationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is Required"),
    password: Yup.string().required("Password is Required"),

});

const Login = () => {
    const isSmallDevice = useMediaQuery("(max-width:600px)");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
          
            const response = await fetch('https://qa.nuralservice.com/FirebolttServiceAPI/api/User/login', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authkey}`
                },
                body: JSON.stringify(values),
            }).then(data => data.json());

            // console.log("Response-----------",response);
    
            if (!response.ok) {
                const errorData = await response.json();
                setFieldError('userName', errorData.message); 
                return;
            }
    
            console.log('Login successful');
            
        } catch (error) {
            console.error('Error:', error);
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
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        maxHeight="100vh"
                        padding={isSmallDevice ? 0 : 6}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={10}
                            md={8}
                            lg={5}
                            className="formContainer"
                        >
                            <Grid
                                container
                                spacing={2}
                                className="formElements"
                            >
                                <Grid item xs={12}>
                                    <img
                                        src={CompanyLogo}
                                        alt="companyLogo"
                                        className="companyLogoImage"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Login to your Account
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel htmlFor="username" className="inputText">
                                        User Name
                                    </InputLabel>

                                    <TextField
                                        fullWidth
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}
                                    />

                                    {touched.userName && errors.userName && (
                                        <FormHelperText error>{errors.userName}</FormHelperText>
                                    )}

                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel htmlFor="password" className="inputText">
                                        Password
                                    </InputLabel>

                                    <TextField
                                        fullWidth
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                     {touched.password && errors.password && (
                                        <FormHelperText>{errors.password}</FormHelperText>
                                    )}
                                </Grid>
                            
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    className="rememberMe"
                                >
                                    <Grid item xs={6} className="inputText">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Remember Me"
                                        />
                                    </Grid>

                                    <Grid item xs={6} className="forgotPasswordText">
                                        <Typography variant="body2">
                                            <Link to="/forgot-password" className="forgot-btn">
                                                Forgot Password ?
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <AuthenticateButton
                                        type="submit"
                                        name="login"
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
                                sx={{
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
                                    Nural Service
                                </Typography>
                                <br />
                                <img src={dashBoardImage} alt="Dashboard" />
                                <br />
                                <img
                                    src={copyRightImage}
                                    alt="copyRightImage"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default Login;
