import * as React from "react";
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { LinearProgress } from "@mui/material";

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
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Api
import UserApi from "api/UserApi";

function Cover() {
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);

  const resendEmailToActiveAccount = async () => {
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    setDisableResendButton(false);
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content="Please check your registered email for email verification"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      action={
        <MDBox
          color="secondary"
          size="small"
          onClick={resendEmailToActiveAccount}
          disabled={isDisableResendButton}
        >
          Resend
        </MDBox>
      }
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDTypography>
      <MDSnackbar
        color="error"
        icon="warning"
        title="500 - Internal server error"
        content="Oops, something went wrong."
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
    </MDTypography>
  );

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your personal info to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              firstname: Yup.string()
                .max(50, "Must be less than 50 characters")
                .required("Required"),

              lastname: Yup.string()
                .max(50, "Must be less than 50 characters")
                .required("Required"),

              username: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Required"),
              // .test(
              //   "checkExistsUsername",
              //   "This username is already registered.",
              //   async (username) => {
              //     // call api
              //     const isExists = await UserApi.existsByUsername(username);
              //     return !isExists;
              //   }
              // ),

              email: Yup.string().email("Invalid email address").required("Required"),
              // .test("checkExistsEmail", "This email is already registered.", async () => {
              //   // call api
              //   const isExists = await UserApi.existsByEmail(email);
              //   return !isExists;
              // }),

              phoneNumber: Yup.string()
                .matches(/^[0-9\- ]{8,14}$/, {
                  message: "Invalid phone number",
                  excludeEmptyString: true,
                })
                .required("Required"),

              password: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Required"),

              confirmPassword: Yup.string()
                .required("Required")
                .when("password", {
                  is: (value) => !!(value && value.length > 0),
                  then: Yup.string().oneOf([Yup.ref("password")], "Confirm Password do not match"),
                }),
            })}
            onSubmit={async (values) => {
              try {
                // call api
                await UserApi.create(
                  values.firstname,
                  values.lastname,
                  values.username,
                  values.email,
                  values.phoneNumber,
                  values.password
                );

                // message
                setEmail(values.email);
                setSuccessSB(true);
              } catch (error) {
                // redirect page error server
                setErrorSB(true);
              }
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <MDBox mb={2}>
                  <FastField
                    component={TextField}
                    name="firstname"
                    type="text"
                    label="First Name"
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
                    name="lastname"
                    type="text"
                    label="Last Name"
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
                    name="email"
                    type="email"
                    label="Email"
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
                    name="phoneNumber"
                    type="text"
                    label="Phone Number"
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
                <MDBox mb={2}>
                  <FastField
                    component={TextField}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="standard"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") submitForm();
                    }}
                  />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms and Conditions
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
                    Submit
                  </MDButton>
                  {renderSuccessSB}
                  {renderErrorSB}
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
