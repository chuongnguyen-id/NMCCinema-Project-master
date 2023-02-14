/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

// @mui lab components
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";

// @mui icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import Ticket from "layouts/profile/components/Ticket";

// Images
import backgroundImage from "assets/images/bg-profile.jpg";
import avatar from "assets/images/avatar.png";

// redux
import { connect } from "react-redux";
import { getListUserAction } from "redux/actions/UserActions";
import { selectUsers } from "redux/selectors/UserSelector";

// HOC
import withAuth from "HOC/withAuth";

// api
import UserApi from "api/UserApi";
import TicketApi from "api/TicketApi";

function Overview(props) {
  const getListUser = props.getListUserAction;
  const userId = props.users.id;

  const [userInfo, setUserInfo] = useState({});
  const [ticketInfo, setTicketInfo] = useState([]);
  const [value, setValue] = useState("profile");
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await UserApi.getProfile();
        // console.log(result);
        getListUser(result);
        setUserInfo(result);
      } catch (error) {
        console.log(error);
        // TODO notification
      }
    };

    getUserProfile();
  }, []);

  useEffect(() => {
    const getTicketInformation = async () => {
      try {
        const result = await TicketApi.getByUserId(userId);
        // console.log(result);
        setTicketInfo(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // TODO notification
      }
    };
    getTicketInformation();
  }, [userId]);

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
      <MDBox mb={2} />
      <Header image={backgroundImage}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab icon={<AccountBoxIcon />} label="Profile" value="profile" />
                <Tab icon={<ConfirmationNumberIcon />} label="My Tickets" value="my-tickets" />
              </TabList>
            </Box>
            <TabPanel value="profile">
              <MDBox mt={5} mb={3}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={7} xl={4} sx={{ textAlign: "center" }}>
                    <Avatar
                      alt="profile-image"
                      src={avatar}
                      sx={{ width: 200, height: 200, mx: 9, my: 4 }}
                    />
                    <MDBox height="100%" mt={0.5} lineHeight={1}>
                      <MDTypography variant="h5" fontWeight="medium">
                        {userInfo.userName}
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        {userInfo.role}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={8} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      info={{
                        userName: userInfo.userName,
                        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
                        mobile: userInfo.phoneNumber,
                        email: userInfo.email,
                      }}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </TabPanel>
            <TabPanel value="my-tickets">
              <MDBox mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card id="delete-account">
                      <MDBox pt={3} px={2}>
                        <MDTypography variant="h6" fontWeight="medium">
                          Ticket Information
                        </MDTypography>
                      </MDBox>
                      <MDBox pt={1} pb={2} px={2}>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                          {ticketInfo.map((item) => (
                            <MDBox key={item.date}>
                              <Ticket
                                name={item.movie.title}
                                theater={item.movie.theater}
                                seat={item.seat}
                                date={item.date}
                                time={item.time}
                                code={item.code}
                                price={item.price}
                              />
                            </MDBox>
                          ))}
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
            </TabPanel>
          </TabContext>
        </Box>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

const mapGlobalStateToProps = (state) => ({
  users: selectUsers(state),
});

export default connect(mapGlobalStateToProps, { getListUserAction })(withAuth(Overview));
