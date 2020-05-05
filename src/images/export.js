import React from "react";
import All_A from "./All_A.svg";
import All_B from "./All_B.svg";
import Exclusive_A from "./Exclusive_A.svg";
import Exclusive_B from "./Exclusive_B.svg";
import intersection from "./Intersection.svg";
import All from "./All.svg";

function AllIcon(props) {
  return <img src={All} alt="All" />;
}

function AllAIcon(props) {
  return <img src={All_A} alt="All A" />;
}
function AllBIcon(props) {
  return <img src={All_B} alt="All B" />;
}
function ExclusiveAIcon(props) {
  return <img src={Exclusive_A} alt="Exclusive A" />;
}
function ExclusiveBIcon(props) {
  return <img src={Exclusive_B} alt="Exclusive B" />;
}
function IntersectionIcon(props) {
  return <img src={intersection} alt="Intersection" />;
}

export {
  AllIcon,
  AllAIcon,
  AllBIcon,
  ExclusiveAIcon,
  ExclusiveBIcon,
  IntersectionIcon,
};
