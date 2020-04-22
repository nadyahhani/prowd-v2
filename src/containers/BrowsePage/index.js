import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";
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
// import { useHistory } from "react-router-dom";

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
  // const history = useHistory();
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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Entity</TableCell>
                  <TableCell align="right">Filters</TableCell>
                  <TableCell align="right">Properties</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!state.loading ? (
                  state.dashboards.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <Typography
                          component="a"
                          href={`/dashboards/${row.profileHashCode}/profile`}
                        >
                          {row.entityID}{" "}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.profileFilters}</TableCell>
                      <TableCell align="right">
                        {row.profileProperties}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="loading">
                    <Loading />
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
