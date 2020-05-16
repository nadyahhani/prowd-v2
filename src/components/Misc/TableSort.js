import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function TableSort(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {}, []);

  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Sort By"
      value={selected}
      onChange={(e, child) => {
        setSelected(child.props.value);
        props.onChange(child.props.value);
      }}
      variant="outlined"
      size="small"
      fullWidth
    >
      <MenuItem value={0}># of Properties</MenuItem>
      <MenuItem value={1}>Item Name</MenuItem>
      <MenuItem value={2}>Property Check</MenuItem>
    </TextField>
  );
}
