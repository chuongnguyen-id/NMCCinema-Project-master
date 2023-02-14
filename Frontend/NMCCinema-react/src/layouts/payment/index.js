/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */

import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { LinearProgress } from "@mui/material";
import TextField from "@mui/material/TextField";

// Radio
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Toolbar from "@material-ui/core/Toolbar";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// formik components
import { Formik, Form, Field } from "formik";

// Material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// SeatPicker
import SeatPicker from "react-seat-picker";

// DatePicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Api
import withAuth from "HOC/withAuth";
import UserApi from "api/UserApi";
import TicketApi from "api/TicketApi";

const useStyles = makeStyles(() => ({
  seats: {
    backgroundColor: "rgb(43, 39, 39)",
    height: "55vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  screen: {
    background: "white",
    width: "30%",
    height: "8px",
    justifyContent: "center",
  },
  seatPrice: {
    marginTop: "20px",
    display: "flex",
    backgroundColor: "white",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  seatSelect: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  seatsSelect: {
    fontSize: "20px",
    marginLeft: "20px",
  },
  price: {
    fontSize: "20px",
  },
  totalprice: {
    marginLeft: "50%",
  },
  center: {
    margin: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButton: {
    margin: 10,
    padding: 10,
    color: "black",
  },
}));

function Payment() {
  const { movieId } = useParams();
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({});
  const [selected, setSelected] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [value, setValue] = useState(new Date());

  const rows = [
    [
      { id: 1, number: "A1" },
      { id: 2, number: "A2" },
      { id: 3, number: "A3" },
      { id: 4, number: "A4" },
      { id: 24, number: "A5" },
      { id: 34, number: "A6" },
      { id: 44, number: "A7" },
      { id: 54, number: "A8" },
      null,
      { id: 5, number: "A9" },
      { id: 6, number: "A10" },
      { id: 7, number: "A11" },
      { id: 8, number: "A12" },
      { id: 9, number: "A13", isReserved: true },
    ],
    [
      { id: 11, number: "B1" },
      { id: 12, number: "B2" },
      { id: 13, number: "B3", isReserved: true },
      { id: 14, number: "B4" },
      { id: 74, number: "B5" },
      { id: 84, number: "B6" },
      { id: 34, number: "B7" },
      { id: 94, number: "B8" },
      null,
      { id: 15, number: "B9" },
      { id: 16, number: "B10" },
      { id: 17, number: "B11" },
      { id: 18, number: "B12" },
      { id: 19, number: "B13" },
    ],
    [
      { id: 21, number: "C1" },
      { id: 22, number: "C2" },
      { id: 23, number: "C3" },
      { id: 24, number: "C4" },
      { id: 29, number: "C5" },
      { id: 20, number: "C6" },
      { id: 99, number: "C7" },
      { id: 98, number: "C8" },
      null,
      { id: 25, number: "C9" },
      { id: 26, number: "C10" },
      { id: 27, number: "C11", isReserved: true },
      { id: 28, number: "C12" },
      { id: 29, number: "C13" },
      null,
    ],
    [
      { id: 11, number: "D1" },
      { id: 12, number: "D2" },
      { id: 13, number: "D3", isReserved: true },
      { id: 14, number: "D4" },
      { id: 74, number: "D5" },
      { id: 84, number: "D6" },
      { id: 34, number: "D7" },
      { id: 94, number: "D8" },
      null,
      { id: 15, number: "D9" },
      { id: 16, number: "D10" },
      { id: 17, number: "D11" },
      { id: 18, number: "D12" },
      { id: 19, number: "D13" },
    ],
    [
      { id: 11, number: "E1" },
      { id: 12, number: "E2" },
      { id: 13, number: "E3" },
      { id: 14, number: "E4" },
      { id: 74, number: "E5" },
      { id: 84, number: "E6" },
      { id: 34, number: "E7" },
      { id: 94, number: "E8" },
      null,
      { id: 15, number: "E9" },
      { id: 16, number: "E10" },
      { id: 17, number: "E11" },
      { id: 18, number: "E12" },
      { id: 19, number: "E13" },
    ],
    [
      { id: 11, number: "F1" },
      { id: 12, number: "F2" },
      { id: 13, number: "F3" },
      { id: 14, number: "F4" },
      { id: 74, number: "F5" },
      { id: 84, number: "F6" },
      { id: 34, number: "F7" },
      { id: 94, number: "F8" },
      null,
      { id: 15, number: "F9" },
      { id: 16, number: "F10" },
      { id: 17, number: "F11" },
      { id: 18, number: "F12" },
      { id: 19, number: "F13" },
    ],
    [
      { id: 11, number: "G1" },
      { id: 12, number: "G2" },
      { id: 13, number: "G3" },
      { id: 14, number: "G4" },
      { id: 74, number: "G5" },
      { id: 84, number: "G6" },
      { id: 34, number: "G7", isReserved: true },
      { id: 94, number: "G8" },
      null,
      { id: 15, number: "G9" },
      { id: 16, number: "G10" },
      { id: 17, number: "G11" },
      { id: 18, number: "G12" },
      { id: 19, number: "G13" },
    ],
  ];

  // Seat picker
  const price = 125000;
  const totalprice = price * selected.length;
  const addSeatCallback = ({ row, number, id }, addCb) => {
    setSelected((prevItems) => [...prevItems, number]);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
  };

  const removeSeatCallback = ({ row, number }, removeCb) => {
    setSelected((list) => list.filter((item) => item !== number));
    removeCb(row, number);
  };

  // Notification
  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Payment Success"
      content="Please check your ticket in profile"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDTypography>
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error"
        content="Please complete all information"
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
    </MDTypography>
  );

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await UserApi.getProfile();
        // console.log(result);
        setUserInfo(result);
      } catch (error) {
        console.log(error);
        // TODO notification
      }
    };

    getUserProfile();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={0}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Payment
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              seat: "",
              date: "",
              time: "",
              price: "",
              userId: "",
              movieId: "",
            }}
            onSubmit={async (values) => {
              if (
                selected.toString() &&
                value.toISOString().substring(0, 10) &&
                values.time &&
                totalprice &&
                userInfo.id &&
                movieId &&
                values.pay
              ) {
                try {
                  // call api
                  await TicketApi.create(
                    selected.toString(), // seat
                    value.toISOString().substring(0, 10), // date
                    values.time, // time
                    totalprice, // price
                    userInfo.id, // userId
                    movieId
                  );

                  setSuccessSB(true);
                } catch (error) {
                  // redirect page error server
                  setErrorSB(true);
                }
              } else {
                setErrorSB(true);
              }
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <MDBox className={classes.center} mb={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      defaultCalendarMonth={new Date()}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={params?.inputProps?.placeholder}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      )}
                      disablePast
                      inputFormat="DD-MM-YYYY"
                    />
                  </LocalizationProvider>
                </MDBox>
                <MDBox className={classes.center} mb={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="8:00" />}
                        label="&nbsp;&nbsp;8:00"
                      />
                    </MDTypography>
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="11:00" />}
                        label="&nbsp;&nbsp;11:00"
                      />
                    </MDTypography>
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="14:00" />}
                        label="&nbsp;&nbsp;14:00"
                      />
                    </MDTypography>
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="17:00" />}
                        label="&nbsp;&nbsp;17:00"
                      />
                    </MDTypography>
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="20:00" />}
                        label="&nbsp;&nbsp;20:00"
                      />
                    </MDTypography>
                    <MDTypography p={2}>
                      <FormControlLabel
                        control={<Field type="radio" name="time" value="23:00" />}
                        label="&nbsp;&nbsp;23:00"
                      />
                    </MDTypography>
                  </RadioGroup>
                </MDBox>
                <MDBox className={classes.seats} mb={2}>
                  <MDBox className={classes.screen}>
                    <Toolbar />
                  </MDBox>
                  <MDBox color="white">Screen</MDBox>
                  <SeatPicker
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    alpha
                    maxReservableSeats={10}
                    visible
                  />
                  {selected.length !== 0 ? (
                    <MDBox className={classes.seatPrice}>
                      <MDBox className={classes.seatSelect}>
                        <MDBox className={classes.seatsSelect}>SEAT:{selected.toString()}</MDBox>
                      </MDBox>
                      <MDBox className={classes.totalprice}>
                        <MDBox className={classes.price}>
                          price:$
                          {totalprice}
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  ) : null}
                </MDBox>
                <MDBox m={3}>
                  <MDTypography variant="h6">Payment Methods</MDTypography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <MDTypography p={0.5}>
                      <FormControlLabel
                        control={
                          <Field type="radio" name="pay" value="ATM card (Vietnam Domestic)" />
                        }
                        label="&nbsp;&nbsp;ATM card (Vietnam Domestic)"
                      />
                    </MDTypography>
                    <MDTypography p={0.5}>
                      <FormControlLabel
                        control={
                          <Field
                            type="radio"
                            name="pay"
                            value="Credit Card (Visa, Master, American Express, JCB)"
                          />
                        }
                        label="&nbsp;&nbsp;Credit Card (Visa, Master, American Express, JCB)"
                      />
                    </MDTypography>
                    <MDTypography p={0.5}>
                      <FormControlLabel
                        control={<Field type="radio" name="pay" value="Momo" />}
                        label="&nbsp;&nbsp;Momo"
                      />
                    </MDTypography>
                    <MDTypography p={0.5}>
                      <FormControlLabel
                        control={<Field type="radio" name="pay" value="ZaloPay" />}
                        label="&nbsp;&nbsp;ZaloPay"
                      />
                    </MDTypography>
                    <FormHelperText>
                      I agree to the{" "}
                      <a href="#">
                        <u>Terms of Use</u>
                      </a>{" "}
                      and am purchasing tickets for age appropriate audience
                    </FormHelperText>
                  </RadioGroup>
                </MDBox>
                {isSubmitting && <LinearProgress />}
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="warning"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                  >
                    Pay Now
                  </MDButton>
                  {renderSuccessSB}
                  {renderErrorSB}
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default withAuth(Payment);
