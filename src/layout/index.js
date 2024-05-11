import React from "react";
import NavigationBar from "../components/Nav";
import Footer from "../components/Footer";
import propTypes from "prop-types";

const DefaultLayout = (props) => {
  return (
    <>
      <NavigationBar />
      {props.children}
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: propTypes.node,
};

export default DefaultLayout;
