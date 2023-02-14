// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function MovieProjectCard({ image, label, title, description, action }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        width: "260px",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <MDTypography component={Link} to={action.route}>
          <CardMedia
            src={image}
            component="img"
            to={action.route}
            title={title}
            sx={{
              width: "100%",
              height: "390px",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </MDTypography>
      </MDBox>
      <MDBox mt={1} mx={0.5} textAlign="center">
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox
          mb={1}
          style={{
            WebkitLineClamp: "1",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox
          mb={2}
          lineHeight={0}
          style={{
            WebkitLineClamp: "1",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox mb={1} textAlign="center">
          {action.type === "internal" ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the MovieProjectCard
MovieProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieProjectCard;
