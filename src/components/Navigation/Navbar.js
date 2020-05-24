import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  ButtonBase,
  Chip,
  Paper,
  Dialog,
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import { ProwdLogo } from "../../images/export";
import { getEntityInfo, getClasses } from "../../services/general";
import { getUnique, cut, filterOptions } from "../../global";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "../Misc/Loading";
import { Search } from "@material-ui/icons";
import Link from "../Misc/Link";

const useStyles = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    minWidth: "1225px",
    width: "100vw",
    // position: "absolute",
    height: theme.spacing(6),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.accent.main}`,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    color: theme.palette.accent.dark,
  },
  inputRoot: {
    color: "inherit",
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
    // backgroundColor: "rgba(0,0,0,0)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "inherit",
    minHeight: "inherit",
    maxHeight: "inherit",
  },
  placeholder: {
    fontSize: theme.typography.fontSize,
  },
  buttons: {
    // float: "none",
    // position: "absolute",
    // width: "100%",
    // flexDirection: "row",
    // justifyContent: "center",
    // "& > *": {
    //   padding: theme.spacing(2),
    // },
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
    overflowY: "hidden",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    search: "",
    searchInput: "",
    selectedSearch: null,
    propertiesOptions: [],
    classOfSearch: [],
    filtersOfSearch: [],
    showFilterOptions: [],
    filterInput: "",
    searchisloading: false,
    classes: [],
    popper: {
      open: false,
      anchorEl: null,
    },
  });

  React.useEffect(() => {}, []);

  const renderInput = (params) => (
    <TextField
      {...params}
      size="small"
      variant="outlined"
      placeholder="Search Wikidata for item..."
      inputProps={{
        ...params.inputProps,
        autoComplete: "new-password",
      }}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {state.searchisloading ? (
              <CircularProgress color="primary" size={20} />
            ) : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
        startAdornment: (
          <InputAdornment position="start">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"
              alt="wikidata-logo"
              style={{ width: theme.spacing(4) }}
            />
            {params.InputProps.startAdornment}
          </InputAdornment>
        ),
      }}
    />
  );

  const itemSearch = () => {
    return (
      // <Paper classes={{ root: classes.searchBox }}>
      <Dialog
        open={state.popper.open}
        classes={{ paper: classes.searchBox }}
        onClose={() => {
          setState((s) => ({
            ...s,
            popper: { ...s.popper, open: false },
            searchInput: "",
            filterInput: "",
          }));
        }}
      >
        <Grid
          container
          justify="center"
          spacing={2}
          direction="column"
          // className={classes.inputInput}
          style={{ height: "100%", width: "100%", padding: theme.spacing(2) }}
        >
          <Grid item>
            <Typography>
              <Box fontWeight="bold">Item information on Wikidata</Box>
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "100%" }}>
              <Autocomplete
                filterOptions={filterOptions}
                disableClearable
                label="Search Wikidata for item..."
                placeholder="Type and select the item to see its class and filters"
                options={state.classes}
                loading={state.searchisloading}
                inputValue={state.searchInput}
                value={state.selectedSearch}
                renderInput={renderInput}
                onInputChange={(e) => {
                  // console.log(e);
                  if (e) {
                    const tempval = e.target.value;
                    setState((s) => ({
                      ...s,
                      searchInput: tempval,
                      searchisloading: true,
                    }));

                    getClasses(e.target.value, (response) => {
                      response.success &&
                        setState((s) => ({
                          ...s,
                          searchisloading: false,
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
                      selectedSearch: newValue,
                      searchInput: `${newValue.label} (${newValue.id})`,
                      searchisloading: true,
                    }));
                    getEntityInfo(newValue.id, (r) => {
                      if (r.success) {
                        setState((s) => ({
                          ...s,
                          classOfSearch: r.classes,
                          filtersOfSearch: r.filters,
                          showFilter: null,
                          showFilterOptions: getUnique(
                            r.filters.map((item) => item.property),
                            "id"
                          ),
                          searchisloading: false,
                        }));
                      }
                    });
                  }
                  if (reason === "clear") {
                    setState((s) => ({
                      ...s,
                      selectedSearch: null,
                      searchInput: "",
                    }));
                  }
                }}
                onClose={(event, reason) => {
                  if (reason !== "select-option" && !state.selectedClass) {
                    setState((s) => ({
                      ...s,
                      selectedSearch: null,
                      searchInput: "",
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
            </div>
          </Grid>
          <Grid item>
            <Typography
              component="div"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {state.selectedSearch ? state.selectedSearch.label : ""} is an
              instance of th
              {state.classOfSearch.length > 1 ? "ese " : "is "} Class
              {state.classOfSearch.length > 1 ? "es" : ""}
            </Typography>
            <Paper
              variant="outlined"
              elevation={0}
              style={{
                padding: theme.spacing(1),
                width: "98%",
                height: theme.spacing(10),
                overflowY: "scroll",
              }}
            >
              {state.searchisloading ? (
                <Loading />
              ) : (
                <Grid container spacing={1}>
                  {state.classOfSearch.map((item) => (
                    <Grid item>
                      <Chip
                        size="small"
                        label={`${item.label} (${item.id})`}
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <Typography
              component="div"
              style={{ display: "flex", flexDirection: "row" }}
            >
              Statements about{" "}
              {state.selectedSearch ? state.selectedSearch.label : ""}
            </Typography>
            <Autocomplete
              freeSolo
              disableClearable
              options={[...state.showFilterOptions]
                .sort((a, b) =>
                  a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
                )
                .map((item) => item.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  size="small"
                  variant="outlined"
                  placeholder="Search for Statement..."
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                />
              )}
              onInputChange={(e, val, reason) => {
                setState((s) => ({ ...s, filterInput: val }));
              }}
              onChange={(e, value, reason) => {
                if (reason === "select-option") {
                  setState((s) => ({
                    ...s,
                    filterInput: `${value}`,
                  }));
                } else if (reason === "clear") {
                  setState((s) => ({
                    ...s,
                    filterInput: "",
                  }));
                }
              }}
            />
            <TableContainer
              component={(props) => (
                <Paper {...props} variant="outlined" elevation={0} />
              )}
              style={{ height: theme.spacing(40) }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.searchisloading
                    ? [0, 0, 0, 0, 0].map((item) => (
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Loading variant="text" />
                          </TableCell>
                        </TableRow>
                      ))
                    : state.filtersOfSearch
                        .filter((item) =>
                          `${item.property.label} (${item.property.id}) ${item.value.label} (${item.value.id})`
                            .toLowerCase()
                            .includes(state.filterInput.toLowerCase())
                        )
                        .map((item, index) => (
                          <TableRow>
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
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                setState((s) => ({
                  ...s,
                  popper: { ...s.popper, open: false },
                }));
              }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      // </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {itemSearch()}
      <AppBar
        position="fixed"
        elevation={0}
        // color="transparent"
        // variant="outlined"
        style={{
          height: "inherit",
          maxHeight: "inherit",
          minHeight: "inherit",
        }}
      >
        <Toolbar
          classes={{ root: classes.toolbar, gutters: classes.gutters }}
          variant="dense"
          disableGutters
        >
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: `0 ${theme.spacing(2)}px` }}
          >
            <Grid item xs={3}>
              <ButtonBase
                onClick={() => {
                  history.push("/");
                  window.location.hash = "home";
                }}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  noWrap
                  component="div"
                >
                  <ProwdLogo style={{ height: theme.spacing(2) }} />
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="center" spacing={4}>
                <Grid item>
                  <Link to={{ pathname: "/", hash: "#home" }}>
                    <Button
                      color={
                        window.location.pathname === "/" ||
                        window.location.hash.includes("home")
                          ? "primary"
                          : ""
                      }
                      // onClick={() => {
                      //   history.push("/");
                      //   window.location.hash = "home";
                      // }}
                    >
                      Home
                    </Button>
                  </Link>
                </Grid>
                <Grid item id="dashboards-nav-button">
                  <Link to="/browse/search=">
                    <Button
                      color={
                        window.location.pathname.includes("/browse/")
                          ? "primary"
                          : ""
                      }
                      // onClick={() => history.push("/browse/search=")}
                    >
                      Dashboards
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={{ pathname: "/", hash: "#about" }}>
                    <Button
                    // onClick={() => {
                    //   history.push("/");
                    //   window.location.hash = "about";
                    // }}
                    >
                      About
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} id="search-wikidata-navbar">
              <Autocomplete
                filterOptions={filterOptions}
                label=""
                placeholder="Search Wikidata for item..."
                options={state.classes}
                loading={state.searchisloading}
                noOptionsText={
                  state.classes.length === 0
                    ? "Type to see options"
                    : `There are no items containing ${state.searchInput}`
                }
                inputValue={state.searchInput}
                value={state.selectedSearch}
                onInputChange={(e) => {
                  // console.log(e);
                  if (e) {
                    const tempval = e.target.value;
                    setState((s) => ({
                      ...s,
                      searchInput: tempval,
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
                      selectedSearch: newValue,
                      searchInput: `${newValue.label} (${newValue.id})`,
                      searchisloading: true,
                      popper: { open: true },
                    }));
                    getEntityInfo(newValue.id, (r) => {
                      if (r.success) {
                        setState((s) => ({
                          ...s,
                          classOfSearch: r.classes,
                          filtersOfSearch: r.filters,
                          showFilterOptions: getUnique(
                            r.filters.map((item) => item.property),
                            "id"
                          ),
                          searchisloading: false,
                        }));
                      }
                    });
                  }
                  if (reason === "clear") {
                    setState((s) => ({
                      ...s,
                      selectedSearch: null,
                      searchInput: "",
                    }));
                  }
                }}
                onClose={(event, reason) => {
                  if (reason !== "select-option" && !state.selectedClass) {
                    setState((s) => ({
                      ...s,
                      selectedSearch: null,
                      searchInput: "",
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
                renderInput={renderInput}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
