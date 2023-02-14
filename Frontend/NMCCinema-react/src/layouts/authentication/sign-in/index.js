/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */

import React, { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { LinearProgress } from "@mui/material";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// formik components
import { Formik, Form, FastField } from "formik";
import { TextField } from "formik-mui";

// yup components
import * as Yup from "yup";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { connect } from "react-redux";
import {
  setTokenInfo,
  setUserLoginInfo,
  setRememberMeInfo,
} from "redux/actions/UserLoginInfoActions";
import { selectRememberMe } from "redux/selectors/UserLoginInfoSelector";

import storage from "Storage/Storage";
import UserApi from "api/UserApi";
import LoginApi from "api/LoginApi";

function Basic(props) {
  const [errorSB, setErrorSB] = useState(false);
  const [isRememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [isDisableResendButton, setDisableResendButton] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [action, setAction] = useState();

  const closeErrorSB = () => setErrorSB(false);
  const navigate = useNavigate();

  const resendEmailToActiveAccount = async () => {
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    setDisableResendButton(false);
  };

  const renderErrorSB = (
    <MDTypography>
      <MDSnackbar
        color="error"
        icon="warning"
        title={title}
        content={content}
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        action={action}
        bgWhite
      />
    </MDTypography>
  );

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Required"),

              password: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Required"),
            })}
            onSubmit={async (values) => {
              try {
                // call api
                const result = await LoginApi.login(values.username, values.password);
                // check user active
                if (result.token === null || result.token === undefined) {
                  setEmail(result.email);
                  setAction(
                    <MDBox
                      color="secondary"
                      size="small"
                      onClick={resendEmailToActiveAccount}
                      disabled={isDisableResendButton}
                    >
                      Resend
                    </MDBox>
                  );
                  setTitle("Your account is not active.");
                  setContent("Please check your email to active account.");
                  setErrorSB(true);
                } else {
                  // set remember me
                  storage.setRememberMe(isRememberMe);
                  // save token & UserInfo to storage
                  storage.setToken(result.token);
                  const user = {
                    firstname: result.firstName,
                    lastname: result.lastName,
                    username: result.userName,
                    phonenumber: result.phoneNumber,
                    email: result.email,
                    role: result.role,
                    status: result.status,
                  };
                  storage.setUserInfo(user);
                  // save remember me to redux
                  props.setRememberMeInfo(isRememberMe);
                  // save token & UserInfo to redux
                  props.setTokenInfo(result.token);
                  props.setUserLoginInfo(user);
                  // redirect to home page
                  navigate("/dashboard/default");
                }
              } catch (error) {
                if (error.status === 401) {
                  // show error notification
                  setTitle("Login Fail!");
                  setContent("Wrong Username or Password!");
                } else {
                  // redirect page error server
                  setTitle("500 - Internal server error");
                  setContent("Oops, something went wrong.");
                }
                setErrorSB(true);
              }
            }}
            // validateOnChange={false}
            // validateOnBlur={false}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <MDBox mb={2}>
                  <FastField
                    component={TextField}
                    name="username"
                    type="text"
                    label="Username"
                    variant="standard"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") submitForm();
                    }}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <FastField
                    component={TextField}
                    type="password"
                    name="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") submitForm();
                    }}
                  />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={isRememberMe} onChange={() => setRememberMe(!isRememberMe)} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={() => setRememberMe(!isRememberMe)}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox>
                {isSubmitting && <LinearProgress />}
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                  >
                    sign in
                  </MDButton>
                  {renderErrorSB}
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

const mapGlobalStateToProps = (state) => ({
  isRememberMe: selectRememberMe(state),
});

export default connect(mapGlobalStateToProps, {
  setUserLoginInfo,
  setTokenInfo,
  setRememberMeInfo,
})(Basic);
