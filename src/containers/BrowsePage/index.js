import React from "react";
import { Typography, Chip, Grid, IconButton, Button } from "@material-ui/core";
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
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
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
});

export default function BrowsePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    dashboards: [],
    loading: true,
  });

  React.useEffect(() => {
    getDashboards((r) => {
      if (r.success) {
        setState((s) => ({ ...s, loading: false, dashboards: r.profiles }));
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.bg}>
        <Navbar />
        <div className={classes.content}>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell align="right">Class</TableCell>
                  <TableCell align="right">Filters</TableCell>
                  <TableCell align="right">Properties</TableCell>
                  <TableCell align="right">Created at</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {!state.loading ? (
                  state.dashboards.map((row, index) => (
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
                        <Grid container direction="column" spacing={1}>
                          {row.propertiesInfo.length > 0
                            ? row.propertiesInfo.map((item, idx) => (
                                <Grid item>
                                  <Chip
                                    key={`${index}-${idx}`}
                                    variant="outlined"
                                    size="small"
                                    label={item.propertyLabel}
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
                          return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
                        })()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() =>
                            history.push(`/dashboards/${row.hashCode}/profile`)
                          }
                          endIcon={<KeyboardArrowRightIcon />}
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
