import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

export default function TableSort(props) {
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
      <MenuItem value={0}># of Properties (Highest)</MenuItem>
      <MenuItem value={1}># of Properties (Lowest)</MenuItem>
      <MenuItem value={2}>Property Check (Present)</MenuItem>
      <MenuItem value={3}>Property Check (Not Present)</MenuItem>
      <MenuItem value={4}>Item Name (A-Z)</MenuItem>
      <MenuItem value={5}>Item Name (Z-A)</MenuItem>
    </TextField>
  );
}
