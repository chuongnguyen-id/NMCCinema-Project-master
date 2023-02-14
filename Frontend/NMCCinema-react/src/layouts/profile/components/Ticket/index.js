// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import { Divider, CardMedia } from "@mui/material";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// context
import { useMaterialUIController } from "context";

import logo3 from "assets/images/logos/logo3.png";

function Ticket({ name, seat, theater, date, time, code, price, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ display: "flex" }}>
          <MDBox p={3}>
            <MDBox>
              <CardMedia component="img" image={logo3} sx={{ width: "100%" }} />
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={7} sx={{ ml: -2, display: "flex" }}>
          <Divider orientation="vertical" pt={3} sx={{ borderStyle: "dotted" }} />
          <MDBox p={3} width="100%" display="flex" flexDirection="column">
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              mb={2}
            >
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                {name}
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Theater:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  {theater}
                </MDTypography>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Seat:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  {seat}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Date:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {date}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Time:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {time}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="medium" color="error">
                Code:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium" color="error">
                  {code}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={2} sx={{ ml: -2, display: "flex", alignItems: "center" }}>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Price:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" color="text">
                {price}&nbsp;$
              </MDTypography>
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Ticket
Ticket.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Ticket
Ticket.propTypes = {
  name: PropTypes.string.isRequired,
  theater: PropTypes.string.isRequired,
  seat: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  noGutter: PropTypes.bool,
};

export default Ticket;
