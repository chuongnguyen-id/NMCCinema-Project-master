// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// components
import MDBox from "components/MDBox";

function CoverLayout({ coverHeight, image, children }) {
  return (
    <>
      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.3),
              rgba(gradients.dark.state, 0.3)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox mt={{ xs: -30, lg: -28 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={8}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
