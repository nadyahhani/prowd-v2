import React from "react";
import All_A from "./All_A.svg";
import All_B from "./All_B.svg";
import Exclusive_A from "./Exclusive_A.svg";
import Exclusive_B from "./Exclusive_B.svg";
import intersection from "./Intersection.svg";
import LandingTop from "./LandingTop.svg";
import analysis_1 from "./analysis_ 1.svg";
import files_and_folder_1 from "./files_and_folder 1.svg";
import compare_illustration from "./CompareIllustration.svg";
import discover_illustration from "./discover_illustration.svg";
import mindmap from "./mindmap.svg";
import logo from "./logo.svg";
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

function LandingTopIcon(props) {
  return <img {...props} src={LandingTop} alt="white-wave" />;
}

function AnalysisIcon(props) {
  return <img {...props} src={analysis_1} alt="white-wave" />;
}

function FoldersIcon(props) {
  return <img {...props} src={files_and_folder_1} alt="white-wave" />;
}
function CompareIllustrationIcon(props) {
  return <img {...props} src={compare_illustration} alt="compare" />;
}
function MindMapIcon(props) {
  return <img {...props} src={mindmap} alt="mindmap" />;
}
function ProwdLogo(props) {
  return <img {...props} src={logo} alt="logo" />;
}
function DiscoverIllustration(props) {
  return <img {...props} src={discover_illustration} alt="logo" />;
}
export {
  AllIcon,
  AllAIcon,
  AllBIcon,
  ExclusiveAIcon,
  ExclusiveBIcon,
  IntersectionIcon,
  LandingTopIcon,
  AnalysisIcon,
  FoldersIcon,
  CompareIllustrationIcon,
  MindMapIcon,
  ProwdLogo,
  DiscoverIllustration,
};
