import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/loginAdmin", state: { referer: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
