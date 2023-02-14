/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Redux
import { connect } from "react-redux";
import SearchBar from "material-ui-search-bar";

import withAuth from "HOC/withAuth";
import { getListUserAction } from "redux/actions/UserActions";
import { selectUsers, selectPage, selectSize } from "redux/selectors/UserSelector";
import UserApi from "api/UserApi";

const columns = [
  { Header: "fullname", accessor: "fullName", width: "20%", align: "left" },
  { Header: "role", accessor: "role", align: "left" },
  { Header: "username", accessor: "userName", align: "left" },
  { Header: "email", accessor: "email", align: "left" },
  { Header: "phone number", accessor: "phoneNumber", align: "center" },
  { Header: "status", accessor: "status", align: "center" },
];

function Tables(props) {
  const getListUser = props.getListUserAction;
  const { size } = props;
  const originalRows = props.users;

  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUser = async () => {
      const result = await UserApi.getAll(1, size);
      const users = result.content;
      getListUser(users);
      setRows(users, 1, size);
      setLoading(false);
    };
    getAllUser();
  }, [getListUser, size]);

  function requestSearch(newFilter) {
    console.log("New Filter: ", newFilter);
    const filteredRows = originalRows.filter((row) =>
      (row.fullName + row.userName + row.email + row.phoneNumber + row.role)
        .toLowerCase()
        .includes(newFilter.toLowerCase())
    );
    setRows(filteredRows);
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
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
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Management
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2} width="300px">
                <SearchBar
                  value={searched}
                  onChange={(newFilter) => requestSearch(newFilter)}
                  onCancelSearch={() => cancelSearch()}
                />
              </MDBox>
              <MDBox pt={1}>
                <DataTable
                  table={{ columns, rows }}
                  // isSorted={false}
                  entriesPerPage={false}
                  // showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

const mapGlobalStateToProps = (state) => ({
  users: selectUsers(state),
  page: selectPage(state),
  size: selectSize(state),
  // totalElement: selectTotalElement(state),
  // sortField: selectSortField(state),
  // sortType: selectSortType(state),
  // selectedRows: selectSelectedRows(state),
});

export default connect(mapGlobalStateToProps, { getListUserAction })(withAuth(Tables));
