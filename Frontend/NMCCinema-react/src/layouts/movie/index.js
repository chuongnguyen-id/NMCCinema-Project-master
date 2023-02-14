/* eslint-disable no-console */
import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { CardMedia } from "@mui/material";

// react-router components
import { Link, useParams } from "react-router-dom";

// components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/movie/components/Header";

import MovieApi from "api/MovieApi";

function MovieOverview() {
  const [movieInfo, setMovieInfo] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieProfile = async () => {
      try {
        const result = await MovieApi.getById(movieId);
        // console.log(result);
        setMovieInfo(result);
      } catch (error) {
        console.log(error);
        // TODO notification
      }
    };

    getMovieProfile();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header image={movieInfo.bannerUrl}>
        <MDBox sx={{ width: "100%", typography: "body1" }}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={7} xl={4} sx={{ textAlign: "center" }}>
                <MDBox sx={{ width: 250, mx: 5 }}>
                  <CardMedia
                    component="img"
                    image={`${movieInfo.posterUrl}?w=248&fit=crop&auto=format`}
                    sx={{ width: "100%" }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={8} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <Grid item>
                  <ProfileInfoCard
                    title={movieInfo.title}
                    description={movieInfo.overview}
                    info={{
                      director: movieInfo.director,
                      genre: movieInfo.genre,
                      releaseDate: movieInfo.releasedDate,
                      runningTime: `${movieInfo.duration} minutes`,
                      rated: movieInfo.rated,
                    }}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                  <Link to={`/${movieInfo.id}/payment`}>
                    <MDButton color="warning" sx={{ mt: -10, ml: 1.5 }}>
                      Booking
                    </MDButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default MovieOverview;
