import React from "react";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  makeStyles,
  Paper,
  Grid,
  Button,
  Card,
  ButtonBase,
  GridList,
  GridListTile,
} from "@material-ui/core";
import tempData from "./tempData";
import Navbar from "../../components/Navigation/Navbar";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "../../components/Inputs/FilterBox";
import { getClasses } from "../../services/general";
import { createDashboard } from "../../services/dashboard";
import { cut, getUnique } from "../../global";
import {
  LandingTopIcon,
  FoldersIcon,
  AnalysisIcon,
  MindMapIcon,
} from "../../images/export";
import { NavigateNext, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLanding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.main,
  },
  mainDiv: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    "& > div": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  inputBox: {
    minWidth: theme.spacing(70),
    width: "90%",
    maxWidth: theme.spacing(100),
    height: theme.spacing(30),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.palette.common.white,
  },
  infoText: {
    width: "60%",
  },
  exampleList: {
    padding: theme.spacing(2),
    width: "100%",
  },
  inputs: {
    width: "100%",
    height: "100%",
  },
  inputInput: {
    width: "85%",
  },
  filters: {
    width: "97%",
  },
  tagline: {
    fontSize: 90,
    fontWeight: "bold",
    lineHeight: "112.7%",
    zIndex: 1,
  },
  landingRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "85vh",
  },
  mainDivLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  subText: {
    zIndex: 1,
    width: "50%",
    marginBottom: theme.spacing(2),
  },
  subTextDesc: {
    zIndex: 1,
    width: "70%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  exampleCarousel: {
    width: "90%",
    flexWrap: "nowrap",
    minWidth: theme.spacing(70),
    maxWidth: theme.spacing(100),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  textAccent: {
    position: "absolute",
    marginTop: `-${theme.spacing(2)}px`,
    width: theme.spacing(50),
    height: theme.spacing(3),
    zIndex: -1,
    backgroundColor: theme.palette.common.white,
  },
}));

function Landing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    classes: [],
    classInput: "",
    selectedClass: null,
    propertiesOptions: [],
    selectedProps: "",
    appliedFilters: [],
  });

  React.useEffect(() => {
    console.log("jalan");

    getClasses("", (response) => {
      setState((s) => ({ ...s, classes: response.entities }));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.mainLanding}>
        <LandingTopIcon style={{ position: "absolute", width: "100%" }} />
        <Navbar />
        <div
          style={{
            width: "85%",
            // maxWidth: theme.spacing(150),
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography
                className={classes.tagline}
                style={{
                  marginBottom: theme.spacing(2),
                }}
              >
                Visualize Knowledge
              </Typography>
              <Typography
                variant="h2"
                className={classes.subText}
                component="div"
              >
                See how well certain topics are covered in{" "}
                <a
                  rel="noopener noreferrer"
                  href="https://www.wikidata.org/wiki/Wikidata:Main_Page"
                  style={{ textDecoration: "none" }}
                >
                  Wikidata
                </a>
              </Typography>
              <Button
                style={{
                  marginBottom: theme.spacing(2),
                }}
                color="primary"
                endIcon={<NavigateNext />}
              >
                Show me
              </Button>
            </div>
            <div className={classes.mainDiv}>
              <Paper className={classes.inputBox} elevation={1}>
                <Grid
                  container
                  justify="center"
                  spacing={2}
                  direction="column"
                  className={classes.inputInput}
                >
                  <Grid item>
                    <VirtualAutocomp
                      label="Class"
                      placeholder="e.g. Human, Disease, Country"
                      options={state.classes}
                      loading={state.classes.length === 0}
                      inputValue={state.classInput}
                      value={state.selectedClass}
                      onInputChange={(e) => {
                        // console.log(e);
                        if (e) {
                          const tempval = e.target.value;
                          setState((s) => ({
                            ...s,
                            classInput: tempval,
                            // classes: [],
                          }));

                          getClasses(e.target.value, (response) => {
                            response.success &&
                              setState((s) => ({
                                ...s,
                                classes: getUnique(
                                  [...s.classes, ...response.entities],
                                  "id"
                                ),
                              }));
                          });
                        }
                      }}
                      onChange={(event, newValue, reason) => {
                        if (newValue) {
                          setState((s) => ({
                            ...s,
                            selectedClass: newValue,
                            classInput: `${newValue.label} (${newValue.id})`,
                          }));
                        }
                        if (reason === "clear") {
                          setState((s) => ({
                            ...s,
                            selectedClass: null,
                            classInput: "",
                          }));
                        }
                      }}
                      onClose={(event, reason) => {
                        console.log(reason, state.selectedClass);

                        if (
                          reason !== "select-option" &&
                          !state.selectedClass
                        ) {
                          setState((s) => ({
                            ...s,
                            classInput: "",
                            selectedClass: null,
                          }));
                        }
                      }}
                      getOptionLabel={(option) => {
                        return `${option.label} (${option.id})${
                          option.aliases
                            ? ` also known as ${option.aliases.join(", ")}`
                            : ""
                        }`;
                      }}
                      renderOption={(option) => (
                        <div>
                          <Typography
                            noWrap
                          >{`${option.label} (${option.id})`}</Typography>
                          <Typography
                            variant="caption"
                            style={{ lineHeight: "1.3vmin" }}
                          >
                            {cut(option.description, 500)}
                          </Typography>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <FilterBox
                      class={state.selectedClass}
                      classes={{ root: classes.filters }}
                      options={state.appliedFilters}
                      propertiesOptions={state.propertiesOptions}
                      selectedClass={state.selectedClass}
                      disabled={!state.selectedClass}
                      onApply={(applied) =>
                        setState((s) => ({ ...s, appliedFilters: applied }))
                      }
                      renderTagText={(opt) =>
                        cut(`${opt.property.label}: ${opt.values.label}`, 1000)
                      }
                      onDelete={(idx) => {
                        const temp = [...state.appliedFilters];
                        temp.splice(idx, 1);
                        setState((s) => ({ ...s, appliedFilters: temp }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      disabled={state.selectedClass === null}
                      onClick={() => {
                        createDashboard(
                          state.selectedClass.id,
                          state.appliedFilters.map((x) => {
                            let temp = {};
                            temp[x.property.id] = x.values.id;
                            return temp;
                          }),
                          (response) =>
                            history.push(
                              `/dashboards/${response.hashCode}/profile`
                            )
                        );
                      }}
                    >
                      Check
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <GridList
                spacing={2}
                cols={3.2}
                cellHeight="auto"
                className={classes.exampleCarousel}
              >
                {tempData.ex.map((x, idx) => (
                  <GridListTile key={idx}>
                    <ButtonBase
                      onClick={() => {
                        setState((s) => ({
                          ...s,
                          selectedClass: x.class,
                          classInput: `${x.class.label} (${x.class.id})`,
                          appliedFilters: x.filters,
                        }));
                      }}
                      style={{ width: "95%" }}
                    >
                      <Card className={classes.exampleList}>
                        <Typography variant="body1" color="primary">
                          {x.label}
                        </Typography>
                      </Card>
                    </ButtonBase>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
          <div className={classes.landingRow}>
            <div
              style={{
                position: "absolute",
                width: theme.spacing(20),
                marginLeft: `-${theme.spacing(10)}px`,
                left: "50%",
                bottom: "5%",
              }}
            >
              <Button color="primary" fullWidth endIcon={<ExpandMore />}>
                Learn More
              </Button>
            </div>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  Explore
                  <div className={classes.textAccent} />
                </Box>

                <Box className={classes.subTextDesc}>
                  Find dominant topics and existing imbalance in general
                  knowledge on Wikidata
                </Box>
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <MindMapIcon />
            </div>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <AnalysisIcon />
            </div>
            <div className={classes.mainDiv}>
              <div style={{ width: "70%" }}>
                <Typography variant="h2" component="div">
                  <Box fontSize={40} fontWeight="bold">
                    Source
                    <div className={classes.textAccent} />
                  </Box>
                  <Box
                    className={classes.subTextDesc}
                    style={{ width: "100%" }}
                  >
                    Wikidata is a crowdsourced knowledge base platform under the{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.wikimedia.org/"
                      style={{ textDecoration: "none" }}
                    >
                      Wikimedia Foundation
                    </a>
                  </Box>
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  Analytics
                  <div className={classes.textAccent} />
                </Box>

                <Box className={classes.subTextDesc}>
                  Using SPARQL query, data is processed and calculated to help
                  you form insights
                </Box>
              </Typography>
              <Button
                style={{
                  marginBottom: theme.spacing(2),
                }}
                color="primary"
                endIcon={<NavigateNext />}
              >
                read how
              </Button>
            </div>
            <div className={classes.mainDiv}>
              <FoldersIcon />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
