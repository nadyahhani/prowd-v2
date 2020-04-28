import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ListItemIcon,
  Typography,
  Chip,
  Popover,
  Checkbox,
  List,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      <ListItem>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize={"3vh"} />
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                color="primary"
                edge="end"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                style={{ fontSize: "2.5vh" }}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={<Typography>{value}</Typography>}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default function AdvChip(props) {
  const [state, setState] = React.useState({ popoverOpen: false });
  return (
    <React.Fragment>
      <Chip
        size="small"
        color="primary"
        label={<Typography>{props.label}</Typography>}
        onClick={(e) => {
          setState((s) => ({
            ...s,
            popoverOpen: true,
            anchorEl: e.currentTarget,
          }));
        }}
        onDelete={props.onDelete}
        variant="outlined"
        disabled={props.disabled}
      />
      <Popover
        open={state.popoverOpen}
        anchorEl={state.anchorEl}
        onClose={() =>
          setState((s) => ({ ...s, popoverOpen: false, anchorEl: null }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <CheckboxList />
      </Popover>
    </React.Fragment>
  );
}

AdvChip.propTypes = {
  label: PropTypes.string,
};
