import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import Typography from "@material-ui/core/Typography";
import { List, ListItem, Popover, Box } from "@material-ui/core";
import theme from "../../theme";
import { deleteDashboard } from "../../services/dashboard";
import { useHistory } from "react-router-dom";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Settings(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [deleteDialog, setDelete] = React.useState({ open: false });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOpen = (e) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton size="small" edge="end" onClick={handleClickOpen}>
        <SettingsIcon color="primary" />
      </IconButton>
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDelete((s) => ({ ...s, open: false }))}
      >
        <DialogContent>
          <Typography variant="h2" component="div">
            <Box fontWeight="bold">
              Are you sure you want to delete this dashboard?
            </Box>
          </Typography>
        </DialogContent>
        <DialogContent style={{ height: theme.spacing(4) }}>
          <Typography component="div">You cannot undo this action.</Typography>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "flex-start",
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(1),
          }}
        >
          <Button
            onClick={() => {
              setDelete((s) => ({ ...s, open: false }));
              deleteDashboard(props.hash, (r) => {
                if (r.success) {
                  history.push({
                    pathname: `/browse/search=`,
                    state: { dashboardDelete: true },
                  });
                } else {
                  props.updateData((s) => ({
                    ...s,
                    notif: {
                      open: true,
                      message: "An Error Occured, Please Try Again",
                      severity: "error",
                    },
                  }));
                }
              });
            }}
            size="small"
            style={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.common.white,
            }}
            variant="contained"
          >
            yes
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() => setDelete((s) => ({ ...s, open: false }))}
          >
            no
          </Button>
        </DialogActions>
      </Dialog>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              props.onChange({ reason: "restart_onboarding" });
              handleClose();
            }}
          >
            <Typography>Restart Onboarding</Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              props.onChange({ reason: "dashboard_deletion" });
              setDelete({ open: true });
              handleClose();
            }}
          >
            <Typography style={{ color: theme.palette.error.main }}>
              Delete Dashboard
            </Typography>
          </ListItem>
        </List>
      </Popover>
    </React.Fragment>
  );
}
