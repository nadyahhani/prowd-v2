import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
import { InputLabel, CircularProgress } from "@material-ui/core";
import theme from "../../theme";
import Autocomplete from "@material-ui/lab/Autocomplete";
const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      // overflowX: "hidden",
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref} style={{ overflowX: "hidden" }}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles(() => ({
  listbox: {
    "& ul": {
      padding: 5,
      margin: 5,
    },
  },
  option: {
    borderBottom: `1px solid ${theme.palette.accent.main}`,
  },
}));

export default function VirtualAutocomp(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <InputLabel shrink={true}>{props.label}</InputLabel>
      <Autocomplete
        size="small"
        noOptionsText={
          props.options.length > 0
            ? `There are no options containing "${props.inputValue}"`
            : "Type to see options"
        }
        
        classes={{ listbox: classes.listbox, option: classes.option }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={props.placeholder}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
              ...props.inputProps,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        {...props}
      />
    </React.Fragment>
  );
}
