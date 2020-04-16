import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment, Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    float: "none",
    "& > *": {
      //   padding: theme.spacing(2),
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar} variant="dense">
          <Box>
            <Typography className={classes.title} variant="h2" noWrap>
              ProWD
            </Typography>
          </Box>
          <Box className={classes.buttons}>
            <Button>Home</Button>
            <Button>Browse</Button>
            <Button>About</Button>
          </Box>
          <Box>
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
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
