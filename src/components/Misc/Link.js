import React from "react";
import { Link as LinkRrd } from "react-router-dom";
export default function Link(props) {
  return <LinkRrd style={{ textDecoration: "none" }} {...props} />;
}
