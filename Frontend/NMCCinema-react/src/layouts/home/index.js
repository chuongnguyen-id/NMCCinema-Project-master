/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// Material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Stepper
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

// Material components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MovieProjectCard from "examples/Cards/ProjectCards/MovieProjectCard";
// Redux
import { selectMovies, selectPage } from "redux/selectors/MovieSelector";
import { getListMovieAction } from "redux/actions/MovieActions";
import { connect } from "react-redux";
import SearchBar from "material-ui-search-bar";
import MovieApi from "api/MovieApi";
import storage from "Storage/Storage";
import CreateMovie from "./components/CreateMovie";
import UpdateMovie from "./components/UpdateMovie";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Home(props) {
  const getListMovie = props.getListMovieAction;
  const itemData = props.movies;

  const [rows, setRows] = useState(itemData);
  const [searched, setSearched] = useState("");
  const [loading, setLoading] = useState(true);

  function requestSearch(newFilter) {
    // console.log("New Filter: ", newFilter);
    const filteredRows = itemData.filter((row) =>
      row.title.toLowerCase().includes(newFilter.toLowerCase())
    );
    setRows(filteredRows);
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  useEffect(() => {
    const getAllMovie = async () => {
      const result = await MovieApi.getAll();
      const movies = result.content;
      getListMovie(movies);
      setRows(movies);
      setLoading(false);
    };
    getAllMovie();
  }, [getListMovie]);

  // Banner Stepper
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = itemData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (loading) {
    return (
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </MDBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {storage.getUserInfo().role === "Admin" ? <CreateMovie /> : ""}
      <MDBox sx={{ width: "100%", flexGrow: 1 }}>
        <Card sx={{ my: 2, padding: 0.1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <MDTypography>{itemData.id}</MDTypography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {itemData.map((step, index) => (
              <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <MDBox
                    component="img"
                    sx={{
                      height: "100%",
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={step.bannerUrl}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <MDButton size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </MDButton>
            }
            backButton={
              <MDButton size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </MDButton>
            }
          />
        </Card>
      </MDBox>
      <MDBox py={3} px={2} width="300px">
        <SearchBar
          value={searched}
          onChange={(newFilter) => requestSearch(newFilter)}
          onCancelSearch={() => cancelSearch()}
        />
      </MDBox>
      <MDBox py={3}>
        <ImageList cols={4} gap={50}>
          {rows.map((item) => (
            <ImageListItem key={item.released_date}>
              <MovieProjectCard
                image={`${item.posterUrl}?w=248&fit=crop&auto=format`}
                label={`${item.duration}' | ${item.rated}`}
                title={item.title}
                description={item.genre}
                action={{
                  type: "internal",
                  route: `/${item.id}`,
                  color: "primary",
                  label: "Booking",
                }}
              />
              {storage.getUserInfo().role === "Admin" ? (
                <UpdateMovie movieId={item.id}>Edit</UpdateMovie>
              ) : (
                ""
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

const mapGlobalStateToProps = (state) => ({
  movies: selectMovies(state),
  page: selectPage(state),
  // size: selectSize(state),
  // totalSize: selectTotalSize(state),
  // selectedRows: selectSelectedRows(state),
});

export default connect(mapGlobalStateToProps, { getListMovieAction })(Home);
