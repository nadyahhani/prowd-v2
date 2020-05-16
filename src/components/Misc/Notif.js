import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notif(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    severity: "info",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((s) => ({ ...s, open: false }));
  };

  React.useEffect(() => {
    handleClose();
    setState((s) => ({
      ...s,
      open: props.open,
      message: props.message,
      severity: props.severity,
    }));
  }, [props.open, props.message, props.severity]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={state.open}
        autoHideDuration={props.severity === "error" ? null : 6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          action={
            <React.Fragment>
              {state.message === "An Error Occured" ? (
                <Button
                  size="small"
                  onClick={() => {
                    handleClose();
                    props.action();
                  }}
                  style={{ color: theme.palette.common.white }}
                >
                  TRY AGAIN
                </Button>
              ) : null}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
