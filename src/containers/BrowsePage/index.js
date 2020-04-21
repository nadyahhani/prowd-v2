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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        <Typography>this is the browse page</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
                    <TableCell align="right">{row.profileProperties}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="loading">
                  <CircularProgress />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}
