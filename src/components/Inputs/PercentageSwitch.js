import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button } from "@material-ui/core";

export default function PercentageSwitch(props) {
  const [value, setValue] = React.useState(props.percentFirst ? 1 : 0);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <ButtonGroup color="primary" {...props}>
      <Button
        onClick={() => {
          setValue(0);
          props.onChange(0);
        }}
        variant={value === 0 ? "contained" : "outlined"}
      >
        #
      </Button>
      <Button
        variant={value === 1 ? "contained" : "outlined"}
        onClick={() => {
          setValue(1);
          props.onChange(1);
        }}
      >
        %
      </Button>
    </ButtonGroup>
  );
}

PercentageSwitch.propTypes = {
  onChange: PropTypes.func,
};
PercentageSwitch.defaultProps = {
  onChange: () => {},
  value: 0,
};
