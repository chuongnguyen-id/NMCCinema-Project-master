import * as React from "react";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { LinearProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import Icon from "@mui/material/Icon";

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
import CoverLayout from "layouts/home/components/CoverLayout";

// Images
import bgImage from "assets/images/movie-bg.jpg";

// Api
import MovieApi from "api/MovieApi";

function CreateMovie() {
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [modal, setOpenModal] = useState(false);

  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content="Create Successfully"
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
        title="500 - Internal server error"
        content="Oops, something went wrong."
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
    </MDTypography>
  );

  // Add Button
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const addButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleOpen}
    >
      <Icon fontSize="small" color="inherit">
        add
      </Icon>
    </MDBox>
  );

  return (
    <>
      {addButton}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CoverLayout image={bgImage}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="primary"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Add Movie
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <Formik
                initialValues={{
                  title: "",
                  theater: "",
                  posterUrl: "",
                  bannerUrl: "",
                  director: "",
                  overview: "",
                  genre: "",
                  rated: "",
                  releasedDate: "",
                  duration: "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    .max(50, "Must be less than 50 characters")
                    .required("Required"),

                  theater: Yup.string().required("Required"),

                  posterUrl: Yup.string().required("Required"),

                  bannerUrl: Yup.string().required("Required"),

                  director: Yup.string()
                    .min(3, "Must be between 3 and 50 characters")
                    .max(50, "Must be between 3 and 50 characters")
                    .required("Required"),

                  genre: Yup.string().required("Required"),

                  rated: Yup.string().required("Required"),

                  duration: Yup.number().required("Required"),
                })}
                onSubmit={async (values) => {
                  try {
                    // call api
                    await MovieApi.create(
                      values.title,
                      values.theater,
                      values.posterUrl,
                      values.bannerUrl,
                      values.director,
                      values.overview,
                      values.genre,
                      values.rated,
                      values.releasedDate,
                      values.duration
                    );

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
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <MDBox mb={0}>
                          <FastField
                            component={TextField}
                            name="posterUrl"
                            type="text"
                            label="Poster URL"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={0}>
                          <FastField
                            component={TextField}
                            name="bannerUrl"
                            type="text"
                            label="Banner URL"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="title"
                            type="text"
                            label="Title"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="director"
                            type="text"
                            label="Director"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="genre"
                            type="text"
                            label="Genre"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="overview"
                            type="text"
                            label="Overview"
                            fullWidth
                            multiline
                            rows={4}
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="theater"
                            type="text"
                            label="Theater"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="rated"
                            type="text"
                            label="Rated"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography fontSize={15} fontWeight="small" color="text">
                            Released Date
                          </MDTypography>
                          <FastField
                            component={TextField}
                            name="releasedDate"
                            type="date"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <FastField
                            component={TextField}
                            name="duration"
                            type="number"
                            label="duration"
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {isSubmitting && <LinearProgress />}
                        <MDBox mb={1} mx={2}>
                          <MDButton
                            variant="gradient"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            fullWidth
                          >
                            <MDTypography variant="h6" fontWeight="medium" color="white">
                              Add
                            </MDTypography>
                          </MDButton>
                          {renderSuccessSB}
                          {renderErrorSB}
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDBox mb={1} mx={2}>
                          <MDButton
                            variant="gradient"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={handleClose}
                            fullWidth
                          >
                            <MDTypography variant="h6" fontWeight="medium" color="white">
                              Cancel
                            </MDTypography>
                          </MDButton>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </MDBox>
          </Card>
        </CoverLayout>
      </Modal>
    </>
  );
}

export default CreateMovie;
