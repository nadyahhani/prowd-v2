import React from "react";
import {
  Chip,
  Grid,
  Button,
  TextField,
  MenuItem,
  Popper,
  Collapse,
  Typography,
  Fade,
  Slider,
  Box,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { getDashboards } from "../../services/general";
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

const useStyles = makeStyles({
  table: {
    height: "85vh",
    overflowY: "scroll",
  },
  content: {
    marginTop: "0vh",
    padding: theme.spacing(2),
  },
  bg: {
    backgroundColor: theme.palette.background.main,
    height: "100vh",
    width: "100vw",
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
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [giniRange, setRange] = React.useState([0, 1]);

  React.useEffect(() => {
    getDashboards((r) => {
      if (r.success) {
        setState((s) => ({ ...s, loading: false, dashboards: r.profiles }));
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{ zIndex: theme.zIndex.modal }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper classes={{ root: classes.filterPopup }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Typography component="div">
                    <Box fontWeight="bold">Filter Dashboards</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>Class</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item>
                  <Typography>Filters</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                {/* <Grid item>
                  <Typography>Imbalance Rate</Typography>
                  <Slider
                    step={0.01}
                    min={0}
                    max={1}
                    value={giniRange}
                    onChange={(e, val) => setRange(val)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                </Grid> */}
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
      <div className={classes.bg}>
        <Navbar />
        <div className={classes.content}>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>
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
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Button
                      color="primary"
                      size="small"
                      endIcon={<ExpandMore />}
                      fullWidth
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setOpen(!open);
                      }}
                    >
                      Filter
                    </Button>
                  </TableCell>
                </TableRow>
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
                {!state.loading ? (
                  state.dashboards
                    .filter((item) => {
                      const name = `${
                        item.name === ""
                          ? "untitled dashboard"
                          : item.name.toLowerCase()
                      } ${
                        item.author === ""
                          ? "anonymous"
                          : item.author.toLowerCase()
                      }`;
                      return name.includes(
                        props.match.params.search
                          .slice(7)
                          .replace(/\+/g, " ")
                          .toLowerCase()
                      );
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
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() =>
                              history.push(
                                `/dashboards/${row.hashCode}/profile`
                              )
                            }
                            endIcon={<NavigateNext />}
                          >
                            Open
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow key="loading">
                    <TableCell colSpan={7}>
                      <Loading />
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
