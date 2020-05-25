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
  Chip,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Table,
  TableHead,
  TextField,
  Popover,
  Tooltip,
} from "@material-ui/core";
import tempData from "./tempData";
import Navbar from "../../components/Navigation/Navbar";
import VirtualAutocomp from "../../components/Inputs/VirtualAutocomp";
import FilterBox from "../../components/Inputs/FilterBox";
import { getClasses, getEntityInfo } from "../../services/general";
import { createDashboard } from "../../services/dashboard";
import { cut, getUnique, filterOptions } from "../../global";
import {
  LandingTopIcon,
  FoldersIcon,
  AnalysisIcon,
  MindMapIcon,
  UnibzLogo,
  MpiiLogo,
  UILogo,
} from "../../images/export";
import { NavigateNext, ExpandMore, CheckBox, Search } from "@material-ui/icons";
import Help from "../../components/Misc/Help";
import Loading from "../../components/Misc/Loading";
import Tour from "reactour";
import { steps } from "./onboardingSteps";

const useStyles = makeStyles(() => ({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLanding: {
    // marginTop: "8vh",
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
    height: theme.spacing(40),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
    padding: `0 ${theme.spacing(4)}px`,
    flex: "1 1 auto",
    height: "50%",
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
    width: "65%",
    marginBottom: theme.spacing(2),
  },
  subTextDesc: {
    zIndex: 1,
    width: "70%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    textAlign: "justify",
  },
  exampleCarousel: {
    flexWrap: "nowrap",
    overflowX: "scroll",
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
  searchBox: {
    minWidth: theme.spacing(70),
    width: "90%",
    maxWidth: theme.spacing(100),
    height: "fit-content",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLogo: {
    width: theme.spacing(20),
  },
  logodiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogPaper: {
    width: theme.spacing(80),
    maxWidth: theme.spacing(80),
    padding: theme.spacing(2),
  },
}));

function Landing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [onboarding, setOnboarding] = React.useState({ open: false });
  const [state, setState] = React.useState({
    classes: [],
    classesItem: [],
    classInput: "",
    selectedClass: null,
    searchInput: "",
    selectedSearch: null,
    propertiesOptions: [],
    classOfSearch: null,
    filtersOfSearch: [],
    selectedProps: "",
    appliedFilters: [],
    inputtab: 1,
    inputisloading: false,
    // item search
    itemsearchinput: "",
    iteminfoisloading: true,
    selecteditem: null,
    iteminfo: null,
    filtersSelected: {},
    itemDialogisOpen: false,
    itemstatementsearch: "",
    anchoritemDialog: null,
    // end of item search
    popper: {
      open: false,
      anchorEl: null,
    },
  });

  React.useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#home";
    }

    let elmnt = document.getElementById(window.location.hash.replace("#", ""));
    elmnt.scrollIntoView();
    if (!state.firstLoaded) {
      getClasses("", (response) => {
        response.success &&
          setState((s) => ({
            ...s,
            inputisloading: false,
            firstLoaded: true,
            classes: getUnique([...s.classes, ...response.entities], "id"),
          }));
      });
    }
  }, [window.location.href]);
  const handleItemDialogClose = () =>
    setState((s) => ({
      ...s,
      selectedClass: null,
      classInput: "",
      itemDialogisOpen: false,
      itemsearchinput: "",
      iteminfoisloading: true,
      selecteditem: null,
      iteminfo: null,
      filtersSelected: {},
    }));

  const itemSearch = () => {
    return (
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Popover
          open={state.itemDialogisOpen}
          anchorEl={state.anchoritemDialog}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          onClose={handleItemDialogClose}
          classes={{ paper: classes.dialogPaper }}
        >
          <Typography variant="h2" gutterBottom>
            {state.iteminfoisloading || !state.selecteditem ? (
              <Loading variant="text" alignLeft style={{ width: "45%" }} />
            ) : (
              `${state.selecteditem.label} (${state.selecteditem.id})`
            )}
          </Typography>
          <Typography gutterBottom style={{ fontWeight: "bold" }}>
            {state.iteminfoisloading || !state.selecteditem ? (
              <Loading variant="text" />
            ) : state.iteminfo.classes.length > 0 ? (
              "Select the class which best describes the items of your topic of interest"
            ) : (
              "This item is not an instance of any class. Maybe try another item?"
            )}
          </Typography>
          <Paper
            variant="outlined"
            elevation={0}
            style={{ padding: theme.spacing(1) }}
          >
            {state.iteminfoisloading || !state.selecteditem ? (
              <Typography>
                <Loading variant="text" style={{ width: theme.spacing(10) }} />
              </Typography>
            ) : (
              <Grid container spacing={1}>
                {state.iteminfo.classes.length > 0 ? (
                  state.iteminfo.classes.map((item, index) => (
                    <Grid item>
                      <Chip
                        variant={
                          state.selectedClass &&
                          state.selectedClass.id === item.id
                            ? "default"
                            : "outlined"
                        }
                        color="primary"
                        onClick={() =>
                          setState((s) => ({
                            ...s,
                            selectedClass: item,
                            classInput: `${item.label} (${item.id})`,
                          }))
                        }
                        label={`${item.label} (${item.id})`}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item>
                    <Typography>No classes.</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Paper>
          {!state.iteminfoisloading &&
          state.selectedClass &&
          state.iteminfo.classes.filter(
            (item) => state.selectedClass.id === item.id
          ).length !== 0 ? (
            <React.Fragment>
              <Typography
                style={{
                  marginTop: theme.spacing(1),
                  fontWeight: "bold",
                }}
              >
                {state.iteminfoisloading || !state.selecteditem ? (
                  <Loading variant="text" />
                ) : (
                  `Need to be more specific? Filter the class by selecting statements
            about ${state.selecteditem.label} that best describes your topic of interest`
                )}
              </Typography>
              <div>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                  InputProps={{ startAdornment: <Search /> }}
                  placeholder="Search for statements..."
                  value={state.itemstatementsearch}
                  onChange={(e) => {
                    const tempVal = e.target.value;
                    setState((s) => ({
                      ...s,
                      itemstatementsearch: tempVal,
                    }));
                  }}
                />
              </div>
              <TableContainer
                component={(props) => (
                  <Paper {...props} variant="outlined" elevation={0} />
                )}
                style={{ height: theme.spacing(40) }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Property</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.iteminfoisloading || !state.selecteditem
                      ? [0, 0, 0, 0, 0].map((item) => (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Loading variant="text" />
                            </TableCell>
                          </TableRow>
                        ))
                      : state.iteminfo.filters
                          .filter((item) =>
                            `${item.property.label} (${item.property.id}) ${item.value.label} (${item.value.id})`
                              .toLowerCase()
                              .includes(state.itemstatementsearch.toLowerCase())
                          )
                          .map((item, index) => (
                            <TableRow>
                              <TableCell>
                                <Checkbox
                                  color="primary"
                                  checked={
                                    state.filtersSelected[
                                      `${item.property.id}${item.value.id}`
                                    ]
                                  }
                                  onChange={() => {
                                    let temp = { ...state.filtersSelected };
                                    if (
                                      !temp[
                                        `${item.property.id}${item.value.id}`
                                      ]
                                    ) {
                                      temp[
                                        `${item.property.id}${item.value.id}`
                                      ] = true;
                                    } else {
                                      temp[
                                        `${item.property.id}${item.value.id}`
                                      ] = false;
                                    }
                                    setState((s) => ({
                                      ...s,
                                      filtersSelected: temp,
                                    }));
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                {item.property.label} ({item.property.id})
                              </TableCell>
                              <TableCell>
                                {item.value.label} ({item.value.id})
                              </TableCell>
                            </TableRow>
                          ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: theme.spacing(1),
            }}
          >
            <Tooltip title={<Typography>Select a class</Typography>}>
              <div>
                <Button
                  disabled={!state.selectedClass}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      appliedFilters: s.iteminfo.filters.filter(
                        (item, index) =>
                          s.filtersSelected[
                            `${item.property.id}${item.value.id}`
                          ]
                      ),
                      inputtab: 1,
                      itemDialogisOpen: false,
                      itemsearchinput: "",
                      iteminfoisloading: true,
                      selecteditem: null,
                      iteminfo: null,
                      filtersSelected: {},
                    }))
                  }
                >
                  Apply configuration
                </Button>
              </div>
            </Tooltip>
            <Button
              size="small"
              color="primary"
              onClick={handleItemDialogClose}
              style={{ marginLeft: theme.spacing(1) }}
            >
              Close
            </Button>
          </div>
        </Popover>
        <div style={{ width: "96%" }}>
          <VirtualAutocomp
            filterOptions={filterOptions}
            placeholder="Type and select an item"
            options={state.classesItem}
            inputProps={{
              autoFocus: true,
            }}
            loading={state.inputisloading}
            inputValue={state.itemsearchinput}
            value={state.selecteditem}
            onInputChange={(e) => {
              // console.log(e);
              if (e) {
                const tempval = e.target.value;
                setState((s) => ({
                  ...s,
                  itemsearchinput: tempval,
                  inputisloading: true,
                  // classes: [],
                }));

                getClasses(e.target.value, (response) => {
                  response.success &&
                    setState((s) => ({
                      ...s,
                      inputisloading: false,
                      classesItem: getUnique(
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
                  selecteditem: newValue,
                  itemsearchinput: `${newValue.label} (${newValue.id})`,
                  itemDialogisOpen: true,
                  iteminfoisloading: true,
                  anchoritemDialog: document.getElementById("input-box"),
                }));
                getEntityInfo(newValue.id, (r) => {
                  if (r.success) {
                    setState((s) => ({
                      ...s,
                      iteminfoisloading: false,
                      iteminfo: {
                        classes: r.classes,
                        filters: r.filters.filter(
                          (item) =>
                            item.property.id !== "P31" &&
                            item.value.id.slice(0, 1).includes("Q")
                        ),
                      },
                    }));
                  }
                });
              }
              if (reason === "clear") {
                setState((s) => ({
                  ...s,
                  selecteditem: null,
                  itemsearchinput: "",
                }));
              }
            }}
            onClose={(event, reason) => {
              if (reason !== "select-option" && !state.selectedClass) {
                setState((s) => ({
                  ...s,
                  itemsearchinput: "",
                  selecteditem: null,
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
                <Typography variant="caption" style={{ lineHeight: "1.3vmin" }}>
                  {cut(option.description, 500)}
                </Typography>
              </div>
            )}
          />
        </div>
        <Help text="Interested in painters? Type and select Leonardo Da Vinci. Interested in a topic? Type and select an instance of your topic of interest." />
      </Grid>
    );
  };
  const handleClose = () => {
    setOnboarding((s) => ({ ...s, open: false }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Tour
        disableInteraction
        steps={steps}
        goToStep={0}
        isOpen={onboarding.open}
        onRequestClose={handleClose}
        onAfterOpen={(target) => (document.body.style.overflow = "hidden")}
        onBeforeClose={(target) => (document.body.style.overflowY = "scroll")}
        lastStepNextButton={
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleClose}
          >
            Finish
          </Button>
        }
      />
      <div className={classes.mainLanding} id="home">
        <LandingTopIcon style={{ position: "absolute", width: "100%" }} />
        <Navbar />
        <div
          style={{
            width: "85%",
            maxWidth: theme.spacing(162),
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
                See how well your topics of interest are represented in{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
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
                variant="contained"
                color="primary"
                endIcon={<NavigateNext />}
                onClick={() => setOnboarding((s) => ({ ...s, open: true }))}
              >
                Show me how
              </Button>
            </div>
            <div className={classes.mainDiv}>
              <Paper className={classes.inputBox} elevation={1} id="input-box">
                <div style={{ width: "100%" }}>
                  <Tabs
                    value={state.inputtab}
                    onChange={(e, value) =>
                      setState((s) => ({ ...s, inputtab: value }))
                    }
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Visualize by Item" id="topic-item-tab" />
                    <Tab label="Visualize Topic" id="create-dashboard-tab" />
                  </Tabs>
                </div>
                {state.inputtab === 1 ? (
                  <Grid
                    container
                    justify="center"
                    spacing={2}
                    direction="column"
                    className={classes.inputInput}
                  >
                    <Grid
                      item
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Tooltip
                        placement="left"
                        title={
                          <Typography component="div">
                            What are the items of your topic instances of?{" "}
                            <Box fontWeight="bold">
                              Click on the examples at the bottom or use the
                              "Visualize by Item" tab to configure the dashboard
                              based on a subject of your topic.
                            </Box>
                          </Typography>
                        }
                      >
                        <div style={{ width: "100%" }}>
                          <VirtualAutocomp
                            filterOptions={filterOptions}
                            label="Class"
                            placeholder="Input the classification for the items in your topic"
                            options={state.classes}
                            loading={state.inputisloading}
                            inputValue={state.classInput}
                            value={state.selectedClass}
                            onInputChange={(e) => {
                              // console.log(e);
                              if (e) {
                                const tempval = e.target.value;
                                setState((s) => ({
                                  ...s,
                                  classInput: tempval,
                                  inputisloading: true,
                                  // classes: [],
                                }));

                                getClasses(e.target.value, (response) => {
                                  response.success &&
                                    setState((s) => ({
                                      ...s,
                                      inputisloading: false,
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
                                  ? ` also known as ${option.aliases.join(
                                      ", "
                                    )}`
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
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <FilterBox
                        class={state.selectedClass}
                        classes={{ root: classes.filters }}
                        options={state.appliedFilters}
                        propertiesOptions={state.propertiesOptions}
                        selectedClass={state.selectedClass}
                        // disabled={!state.selectedClass}

                        onApply={(applied) =>
                          setState((s) => ({ ...s, appliedFilters: applied }))
                        }
                        renderTagText={(opt) =>
                          cut(`${opt.property.label}: ${opt.value.label}`, 1000)
                        }
                        onDelete={(idx) => {
                          const temp = [...state.appliedFilters];
                          temp.splice(idx, 1);
                          setState((s) => ({ ...s, appliedFilters: temp }));
                        }}
                        onClear={() =>
                          setState((s) => ({ ...s, appliedFilters: [] }))
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        spacing={1}
                        justify="space-between"
                        className={classes.exampleCarousel}
                      >
                        {[...tempData.ex].map((x, idx) => (
                          // <GridListTile key={idx}>
                          <Grid item key={idx}>
                            <Chip
                              size="small"
                              variant="outlined"
                              style={{ width: "98%" }}
                              color="primary"
                              onClick={() => {
                                setState((s) => ({
                                  ...s,
                                  selectedClass: x.class,
                                  classInput: `${x.class.label} (${x.class.id})`,
                                  appliedFilters: x.filters,
                                }));
                              }}
                              label={
                                <Typography variant="body1">
                                  {x.label}
                                </Typography>
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            width: "42%",
                            marginRight: theme.spacing(1),
                          }}
                        >
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
                                  temp[x.property.id] = x.value.id;
                                  return temp;
                                }),
                                (response) =>
                                  history.push(
                                    `/dashboards/${response.hashCode}/profile/onboarding-profile`
                                  )
                              );
                            }}
                          >
                            CREATE DASHBOARD
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    container
                    justify="center"
                    spacing={2}
                    direction="column"
                    className={classes.inputInput}
                  >
                    <Grid item>
                      <Typography
                        variant="h2"
                        style={{ marginBottom: theme.spacing(1) }}
                      >
                        What is a subject of your topic of interest?
                      </Typography>
                    </Grid>
                    {itemSearch()}
                    <Grid item style={{ maxWidth: "100%" }}>
                      <Grid
                        container
                        spacing={1}
                        className={classes.exampleCarousel}
                      >
                        {[...tempData.items].map((x, idx) => (
                          // <GridListTile key={idx}>
                          <Grid item key={idx}>
                            <Tooltip
                              title={
                                <Typography>{`Topic with this subject: ${x.topic}`}</Typography>
                              }
                            >
                              <Chip
                                size="small"
                                variant="outlined"
                                style={{ width: "98%" }}
                                color="primary"
                                onClick={() => {
                                  setState((s) => ({
                                    ...s,
                                    selecteditem: x,
                                    itemsearchinput: `${x.label} (${x.id})`,
                                    itemDialogisOpen: true,
                                    iteminfoisloading: true,
                                    anchoritemDialog: document.getElementById(
                                      "input-box"
                                    ),
                                  }));
                                  getEntityInfo(x.id, (r) => {
                                    if (r.success) {
                                      setState((s) => ({
                                        ...s,
                                        iteminfoisloading: false,
                                        iteminfo: {
                                          classes: r.classes,
                                          filters: r.filters.filter(
                                            (item) =>
                                              item.property.id !== "P31" &&
                                              item.value.id
                                                .slice(0, 1)
                                                .includes("Q")
                                          ),
                                        },
                                      }));
                                    }
                                  });
                                }}
                                label={
                                  <Typography variant="body1">
                                    {x.label} ({x.id})
                                  </Typography>
                                }
                              />
                            </Tooltip>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </div>
          </div>
          <div
            style={{
              // position: "absolute",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              id="about"
              onClick={() => {
                history.push("/");
                window.location.hash = "about";
              }}
            >
              <ExpandMore />
            </IconButton>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  Explore Knowledge
                  <div className={classes.textAccent} />
                </Box>

                <Box className={classes.subTextDesc}>
                  Find any dominant topics and existing imbalance on general
                  knowledge in{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.wikidata.org/wiki/Wikidata:Main_Page"
                    style={{ textDecoration: "none" }}
                  >
                    Wikidata
                  </a>{" "}
                  by profiling your topic of interest.
                </Box>
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <MindMapIcon />
            </div>
          </div>
          <div
            style={{
              // position: "absolute",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              id="about-1"
              onClick={() => {
                history.push("/");
                window.location.hash = "about-1";
              }}
            >
              <ExpandMore />
            </IconButton>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <AnalysisIcon />
            </div>
            <div className={classes.mainDiv}>
              <div style={{ width: "70%" }}>
                <Typography variant="h2" component="div">
                  <Box fontSize={40} fontWeight="bold">
                    Knowledge Gaps
                    <div className={classes.textAccent} />
                  </Box>
                  <Box
                    className={classes.subTextDesc}
                    style={{ width: "100%", textAlign: "justify" }}
                  >
                    <a
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://research.wikimedia.org/knowledge-gaps.html"
                    >
                      Knowledge gaps
                    </a>{" "}
                    are a very real thing. By identifying any imbalanced and
                    underrepresented topics, we are already one step closer to
                    knowledge equity.
                  </Box>
                </Typography>
              </div>
            </div>
          </div>
          <div
            style={{
              // position: "absolute",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              id="about-2"
              onClick={() => {
                history.push("/");
                window.location.hash = "about-2";
              }}
            >
              <ExpandMore />
            </IconButton>
          </div>
          <div className={classes.landingRow}>
            <div className={classes.mainDivLeft}>
              <Typography variant="h2" component="div">
                <Box fontSize={40} fontWeight="bold">
                  What you can do
                  <div className={classes.textAccent} />
                </Box>
                <Box className={classes.subTextDesc}>
                  Interested in a particular topic about science, art, socials,
                  and more? Start profiling your topic by creating a dashboard!
                </Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.hash = "home";
                  }}
                >
                  Get Started
                </Button>
              </Typography>
            </div>
            <div className={classes.mainDiv}>
              <FoldersIcon />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: theme.palette.common.white,
        }}
      >
        <div
          style={{
            height: "fit-content",
            display: "flex",
            padding: `${theme.spacing(2)}px 0`,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            maxWidth: "1225px",
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            direction="row"
          >
            <Grid item xs={3} className={classes.logodiv}>
              <UILogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={3} className={classes.logodiv}>
              <UnibzLogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={3} className={classes.logodiv}>
              <MpiiLogo className={classes.footerLogo} />
            </Grid>
            <Grid item xs={3} className={classes.logodiv}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg"
                alt="wikidata-logo"
                className={classes.footerLogo}
              />
            </Grid>
          </Grid>
        </div>
        <Typography style={{ textAlign: "center" }}>
          2020 - Free University of Bozen-Bolzano, Universitas Indonesia and
          Max-Planck Institute for Informatics.
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
