import React from "react";
import propTypes from "prop-types";

const Login = (props) => {
  return <>{props.children}</>;
};

Login.propTypes = {
  children: propTypes.node,
};
export default Login;
