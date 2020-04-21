import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment, Button, Grid } from "@material-ui/core";
import theme from "../../theme";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
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
    color: theme.palette.accent.main,
  },
  inputRoot: {
    color: "inherit",
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} color="default" variant="outlined">
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
              <Typography className={classes.title} variant="h2" noWrap>
                ProWD
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <Button onClick={() => history.push("/")}>Home</Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => history.push("/dashboards/")}>
                    Browse
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => history.push("/#")}>About</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search for dashboards..."
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.placeholder,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={classes.searchIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
