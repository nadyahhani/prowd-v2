import React from "react";
import {
  Chip,
  Grid,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  InputAdornment,
  Popover,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { getDashboards, getClasses } from "../../services/general";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import theme from "../../theme";
import Navbar from "../../components/Navigation/Navbar";
import Loading from "../../components/Misc/Loading";
import { NavigateNext, ExpandMore, Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUnique, filterOptions } from "../../global";
import Link from "../../components/Misc/Link";
import Notif from "../../components/Misc/Notif";

const useStyles = makeStyles({
  table: {
    height: "88%",
    overflowY: "scroll",
    flex: "1 1 auto",
  },
  content: {
    // marginTop: "9vh",
    height: "90%",
    backgroundColor: theme.palette.background.main,
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    padding: `0 ${theme.spacing(2)}px`,
  },
  bg: {
    backgroundColor: theme.palette.background.main,
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
  },
  filterPopup: {
    width: theme.spacing(50),
    padding: `${theme.spacing(4)}px`,
  },
});

export default function BrowsePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    dashboards: [],
    search: "",
    loading: true,
    sortby: 0,
    classFilterValue: null,
    classFilterInput: "",
    appliedFilters: [],
    classes: [],
    classLoading: false,
    notif: { open: false, severity: "info", message: "" },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // const [giniRange, setRange] = React.useState([0, 1]);

  React.useEffect(() => {
    if (props.location.state && props.location.state.dashboardDelete) {
      setState((s) => ({
        ...s,
        notif: {
          open: true,
          message: "Your Dashboard has been successfully deleted",
          severity: "success",
        },
      }));
    }
    getDashboards((r) => {
      if (r.success) {
        setState((s) => ({ ...s, loading: false, dashboards: r.profiles }));
      }
    });
  }, [props.location.state]);

  return (
    <ThemeProvider theme={theme}>
      <Notif {...state.notif} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => {
          setOpen(false);
        }}
        classes={{ paper: classes.filterPopup }}
      >
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography component="div">
              <Box fontWeight="bold">Filter Dashboards</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Class</Typography>
            <Autocomplete
              filterOptions={filterOptions}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Type and select a class"
                  variant="outlined"
                  size="small"
                />
              )}
              getOptionLabel={(option) => {
                return `${option.label} (${option.id})${
                  option.aliases
                    ? ` also known as ${option.aliases.join(", ")}`
                    : ""
                }`;
              }}
              renderOption={(option) => (
                <div>
                  <Typography>{`${option.label} (${option.id})`}</Typography>
                  <Typography variant="caption">
                    {option.description}
                  </Typography>
                </div>
              )}
              loading={state.classLoading}
              options={state.classes}
              value={state.classFilterValue}
              inputValue={state.classFilterInput}
              onChange={(e, value, reason) => {
                if (reason === "select-option") {
                  setState((s) => ({
                    ...s,
                    classFilterValue: value,
                    classFilterInput: `${value.label} (${value.id})`,
                  }));
                }
              }}
              onInputChange={(e, val, reason) => {
                setState((s) => ({
                  ...s,
                  classLoading: true,
                  classFilterInput: val,
                }));
                getClasses(val, (r) => {
                  if (r.success) {
                    setState((s) => ({
                      ...s,
                      classes: getUnique([...s.classes, ...r.entities], "id"),
                      classLoading: false,
                    }));
                  }
                });
              }}
            />
          </Grid>
          {/* <Grid item>
            <Typography>Filters</Typography>
            <FilterBox
              classes={{ root: classes.filters }}
              options={state.appliedFilters}
              selectedClass={state.classFilterValue}
              hideLabel
              cols={2}
              onApply={(applied) => {
                setState((s) => ({
                  ...s,
                  appliedFilters: applied,
                }));
              }}
              renderTagText={(opt) =>
                cut(`${opt.property.label}: ${opt.value.label}`, 43)
              }
              onDelete={(idx) => {
                let temp = [...state.appliedFilters];
                temp.splice(idx, 1);
                setState((s) => ({
                  ...s,
                  appliedFilters: temp,
                }));
              }}
              onClear={() =>
                setState((s) => ({
                  ...s,
                  appliedFilters: [],
                }))
              }
            />
          </Grid> */}
        </Grid>
        <Grid item style={{ marginTop: theme.spacing(1) }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setState((s) => ({
                  ...s,
                  classFilterValue: null,
                  classFilterInput: "",
                  appliedFilters: [],
                }));
              }}
            >
              Clear
            </Button>
            <Button color="primary" size="small" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Grid>
      </Popover>
      <div className={classes.bg}>
        <Navbar />
        <div className={classes.content}>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item xs={9}>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Search for Dashboards..."
                          fullWidth
                          value={`${props.match.params.search
                            .slice(7)
                            .replace(/\+/g, " ")}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            // setState((s) => ({ ...s, search: val }));
                            history.push(
                              `/browse/search=${val.replace(/ /g, "+")}`
                            );
                          }}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          select
                          label="Sort by"
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={state.sortby}
                          onChange={(e, child) =>
                            setState((s) => ({
                              ...s,
                              sortby: child.props.value,
                            }))
                          }
                        >
                          <MenuItem value={0}>Date Created (Newest)</MenuItem>
                          <MenuItem value={1}>Date Created (Oldest)</MenuItem>
                          <MenuItem value={2}>Title (A-Z)</MenuItem>
                          <MenuItem value={3}>Title (Z-A)</MenuItem>
                          <MenuItem value={4}>Author (A-Z)</MenuItem>
                          <MenuItem value={5}>Author (Z-A)</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          color="primary"
                          size="small"
                          endIcon={<ExpandMore />}
                          fullWidth
                          onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            setOpen(true);
                          }}
                        >
                          Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell align="right">Class</TableCell>
                  <TableCell align="right">Filters</TableCell>
                  <TableCell align="right">Created at</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {!state.loading
                  ? state.dashboards
                      .filter((item) => {
                        const name = `${
                          item.name === ""
                            ? "untitled dashboard"
                            : item.name.toLowerCase()
                        } ${
                          item.author === ""
                            ? "anonymous"
                            : item.author.toLowerCase()
                        } ${item.entityInfo.entityLabel} ${
                          Array.isArray(item.filtersInfo)
                            ? item.filtersInfo.map(
                                (filter) =>
                                  `${filter.filterLabel} ${filter.filterValueLabel}`
                              )
                            : ""
                        }`;
                        return (
                          (state.classFilterValue
                            ? item.entityInfo.entityID ===
                              state.classFilterValue.id
                            : true) &&
                          name.includes(
                            props.match.params.search
                              .slice(7)
                              .replace(/\+/g, " ")
                              .toLowerCase()
                          )
                        );
                      })
                      .sort((b, a) => {
                        switch (state.sortby) {
                          case 1:
                            return a.timestamp < b.timestamp ? 1 : -1;
                          case 2:
                            if (a.name === "") {
                              return "untitled dashboard" < b.name ? 1 : -1;
                            }
                            return a.name < b.name ? 1 : -1;
                          case 3:
                            if (a.name === "") {
                              return "untitled dashboard" > b.name ? 1 : -1;
                            }
                            return a.name > b.name ? 1 : -1;
                          case 4:
                            if (a.name === "") {
                              return "anonymous" > b.author ? 1 : -1;
                            }
                            return a.author < b.author ? 1 : -1;
                          case 5:
                            if (a.name === "") {
                              return "anonymous" > b.author ? 1 : -1;
                            }
                            return a.author > b.author ? 1 : -1;
                          default:
                            return a.timestamp > b.timestamp ? 1 : -1;
                        }
                      })
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.name === "" ? "Untitled Dashboard" : row.name}
                          </TableCell>
                          <TableCell>
                            {row.author === "" ? "Anonymous" : row.author}
                          </TableCell>
                          <TableCell align="right">
                            {`${row.entityInfo.entityLabel} (${row.entityInfo.entityID})`}
                          </TableCell>
                          <TableCell align="right">
                            <Grid container direction="column" spacing={1}>
                              {row.filtersInfo.length > 0
                                ? row.filtersInfo.map((item, idx) => (
                                    <Grid item>
                                      <Chip
                                        key={`${index}-${idx}`}
                                        variant="outlined"
                                        size="small"
                                        label={`${item.filterLabel}: ${item.filterValueLabel}`}
                                      />
                                    </Grid>
                                  ))
                                : "-"}
                            </Grid>
                          </TableCell>
                          <TableCell align="right">
                            {(() => {
                              let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                              d.setUTCSeconds(row.timestamp);
                              return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${
                                d.getHours() < 10 ? 0 : ""
                              }${d.getHours()}:${
                                d.getMinutes() < 10 ? 0 : ""
                              }${d.getMinutes()}`;
                            })()}
                          </TableCell>
                          <TableCell>
                            <Link to={`/dashboards/${row.hashCode}/profile`}>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                endIcon={<NavigateNext />}
                              >
                                Open
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                  : [0, 1, 2, 3, 4].map((item) => (
                      <TableRow key={`loading-${item}`}>
                        <TableCell component="th" scope="row">
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell>
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Loading variant="text" />
                        </TableCell>
                        <TableCell>
                          <Loading variant="text" />
                        </TableCell>
                      </TableRow>
                    ))}
                {state.loading ? null : (
                  <TableRow key={`none`}>
                    <TableCell component="th" scope="row" colSpan={6}>
                      <Typography
                        variant="h2"
                        component="div"
                        style={{ textAlign: "center" }}
                      >
                        {state.dashboards.length < 1
                          ? "There are no dashboards!"
                          : "Can't find anything interesting?"}{" "}
                        <Link to="/">Create your own</Link>.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}
