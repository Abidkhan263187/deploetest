import {
    Grid,
    Typography,
    FormControl,
    TextField,
    InputLabel,
    useMediaQuery,
} from "@mui/material";
import './forgotPassword.css'

import CompanyLogo from "../../assets/CompanyLogo.png";
import dashBoardImage from "../../assets/dashBoardImage.svg";
import copyRightImage from "../../assets/copyRightImage.svg";
import { Link } from "react-router-dom";
import AuthenticateButton from "../common/AuthenticateButton"


const ForgotPassword = () => {
    const isSmallDevice = useMediaQuery("(max-width:600px)");

    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            maxHeight="100vh"
            padding={isSmallDevice ? 0 : 6}
        >
            <Grid item
                xs={12}
                sm={10}
                md={8}
                lg={5}
                className="formContainer"
            >
                <Grid container spacing={2}
                    className="formElements">

                    <Grid item xs={12}>
                        <img src={CompanyLogo} alt="companyLogo"
                            className="companyLogoImage"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Get your Password
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="username"
                            className="inputText"
                        >
                            Enter User Name
                        </InputLabel>

                        <FormControl fullWidth>
                            <TextField fullWidth name="userName" />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="email"
                            className="inputText ">
                            Enter Email ID
                        </InputLabel>

                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                name="email"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} container className="rememberMe" >

                        <Grid item xs={6} className="inputText ">
                        </Grid>

                        <Grid item xs={6} className="forgotPasswordText">
                            <Typography variant="body2">
                                <Link to='/login' className="back-btn">Back</Link>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Link to="/dashboard"><AuthenticateButton name="Submit" /></Link>
                    </Grid>
                </Grid>

            </Grid>

            {!isSmallDevice && (
                <Grid item xs={12} sm={10} md={8} lg={7}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>

                    <Typography variant="h5"
                        className="serviceNameText"
                        gutterBottom>
                        Nural Service
                    </Typography>
                    <br />
                    <img src={dashBoardImage} alt="Dashboard" />
                    <br />
                    <img src={copyRightImage} alt="copyRightImage" />
                </Grid>
            )}
        </Grid>
    );
}

export default ForgotPassword;
