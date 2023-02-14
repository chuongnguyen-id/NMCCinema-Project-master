/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Navigate } from "react-router-dom";
import storage from "../Storage/Storage";

function withAuth(AuthenticatedComponent) {
  class HOC extends React.Component {
    render() {
      return !storage.isAuth() ? (
        <Navigate
          to={{
            pathname: "/authentication/sign-in",
          }}
        />
      ) : (
        <AuthenticatedComponent {...this.props} />
      );
    }
  }
  return HOC;
}

export default withAuth;
