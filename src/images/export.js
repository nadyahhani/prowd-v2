import React from "react";
import All_A from "./All_A.svg";
import All_B from "./All_B.svg";
import Exclusive_A from "./Exclusive_A.svg";
import Exclusive_B from "./Exclusive_B.svg";
import intersection from "./Intersection.svg";
import All from "./All.svg";
import theme from "../theme";
const SIZE = 20;
const EDGE = SIZE - theme.typography.body1.fontSize;
const STYLE_IMG = {
  height: SIZE,
  width: SIZE,
  marginTop: -(EDGE / 2),
  marginBottom: -(EDGE / 2),
};
const STYLE_DIV = {
  height: theme.typography.body1.fontSize,
  width: theme.typography.body1.fontSize,
  overflow: "visible",
};
function AllIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={All} alt="All" />
    </div>
  );
}

function AllAIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={All_A} alt="All A" />
    </div>
  );
}
function AllBIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={All_B} alt="All B" />
    </div>
  );
}
function ExclusiveAIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={Exclusive_A} alt="Exclusive A" />
    </div>
  );
}
function ExclusiveBIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={Exclusive_B} alt="Exclusive B" />
    </div>
  );
}
function IntersectionIcon(props) {
  return (
    <div style={STYLE_DIV}>
      <img style={STYLE_IMG} src={intersection} alt="Intersection" />
    </div>
  );
}

export {
  AllIcon,
  AllAIcon,
  AllBIcon,
  ExclusiveAIcon,
  ExclusiveBIcon,
  IntersectionIcon,
};
