import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
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
  Checkbox,
  FormControl,
  Input,
  Select,
  ListItemText,
  MenuItem,
  Box,
} from "@material-ui/core";
import theme from "../../theme";
import { useHistory } from "react-router-dom";
import { ProwdLogo } from "../../images/export";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getEntityInfo, getClasses } from "../../services/general";
import { getUnique, cut } from "../../global";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "../Misc/Loading";

const useStyles = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    position: "relative",
    height: "7vh",
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
    showFilter: null,
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
      placeholder="Search for Wikidata Items..."
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
            <SearchIcon className={classes.searchIcon} />
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
            showFilter: null,
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
              <Box fontWeight="bold">Item Class and Filters</Box>
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
                disableClearable
                label="Search Wikidata"
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
                  console.log(reason, state.selectedClass);

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
              {state.classOfSearch.length > 1 ? "ese " : "is "}
              <Box fontWeight="bold" style={{ marginLeft: theme.spacing(1) }}>
                Class{state.classOfSearch.length > 1 ? "es" : ""}
              </Box>
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
              Statements linked to{" "}
              {state.selectedSearch ? state.selectedSearch.label : ""} (
              <Box fontWeight="bold">Filters</Box>)
            </Typography>
            <Autocomplete
              getOptionLabel={(option) => {
                return `${option.label} (${option.id})`;
              }}
              renderOption={(option) => (
                <Typography>{`${option.label} (${option.id})`}</Typography>
              )}
              onChange={(e, value, reason) => {
                if (reason === "select-option") {
                  setState((s) => ({
                    ...s,
                    showFilter: value,
                    filterInput: `${value.label} (${value.id})`,
                  }));
                } else if (reason === "clear") {
                  setState((s) => ({
                    ...s,
                    showFilter: null,
                    filterInput: "",
                  }));
                }
              }}
              onInputChange={(e, val, reason) => {
                setState((s) => ({ ...s, filterInput: val }));
              }}
              value={state.showFilter}
              inputValue={state.filterInput}
              options={[...state.showFilterOptions].sort((a, b) =>
                a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  size="small"
                  variant="outlined"
                  placeholder="Search for Filter by Statement Property..."
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
            <Paper
              variant="outlined"
              elevation={0}
              style={{
                padding: theme.spacing(1),
                width: "98%",
                height: theme.spacing(30),
                overflowY: "scroll",
              }}
            >
              {state.searchisloading ? (
                <Loading />
              ) : (
                <Grid container spacing={1}>
                  {state.filtersOfSearch
                    .filter((obj) => {
                      return state.showFilter
                        ? state.showFilter.id === obj.property.id
                        : true;
                    })
                    .map((item) => (
                      <Grid item>
                        <Chip
                          size="small"
                          label={`${item.property.label}: ${item.value.label} (${item.value.id})`}
                          variant="outlined"
                        />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Paper>
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
              <ButtonBase onClick={() => history.push("/")}>
                <Typography
                  className={classes.title}
                  variant="h2"
                  noWrap
                  component="div"
                >
                  <ProwdLogo style={{ height: "12px" }} />
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="center" spacing={4}>
                <Grid item>
                  <Button
                    color={
                      window.location.pathname === "/" ||
                      window.location.hash.includes("home")
                        ? "primary"
                        : ""
                    }
                    onClick={() => {
                      history.push("/");
                      window.location.hash = "home";
                    }}
                  >
                    Home
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color={
                      window.location.pathname.includes("/browse/")
                        ? "primary"
                        : ""
                    }
                    onClick={() => history.push("/browse/search=")}
                  >
                    Dashboards
                  </Button>
                </Grid>
                <Grid item>
                  {/* <a href="/#about" style={{ textDecoration: "none" }}> */}
                  <Button
                    onClick={() => {
                      window.location.hash = "about";
                    }}
                  >
                    About
                  </Button>
                  {/* </a> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                label=""
                placeholder="Search for Wikidata Items..."
                options={state.classes}
                loading={state.searchisloading}
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
                  console.log(reason, state.selectedClass);

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
