import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { AutoSizer, Column, Table } from "react-virtualized";
import { TextField, Typography } from "@material-ui/core";
import { Check, Close, Remove } from "@material-ui/icons";
import theme from "../../theme";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "../Misc/Loading";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {(() => {
          if (columns[columnIndex].link) {
            return (
              <a
                style={{ textDecoration: "none" }}
                href={cellData[columns[columnIndex].linkKey]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cellData[columns[columnIndex].dataKey]}
              </a>
            );
          } else if (columns[columnIndex].dropdown) {
            if (this.props.loading) {
              return <Loading secondary />;
            }
            if (cellData[columns[columnIndex].dataKey]) {
              return (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Check style={{ color: theme.palette.success.main }} />
                </div>
              );
            } else if (cellData[columns[columnIndex].dataKey] === false) {
              return (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Close style={{ color: theme.palette.error.main }} />
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Remove style={{ color: theme.palette.accent.main }} />
                </div>
              );
            }
          } else {
            return cellData[columns[columnIndex].dataKey];
          }
        })()}
      </TableCell>
    );
  };

  cellDataGetter = ({ dataKey, rowData }) => {
    return rowData;
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {columns[columnIndex].dropdown ? (
          <div style={{ width: "100%" }}>
            <Autocomplete
              getOptionLabel={(option) => {
                return option;
              }}
              renderOption={(option) => <Typography>{`${option}`}</Typography>}
              onChange={(e, value, reason) => {
                if (reason === "select-option") {
                  this.props.selectProperty(value);
                }
              }}
              options={this.props.options ? this.props.options : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  size="small"
                  placeholder="Select Property"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>
        ) : (
          <span>{label}</span>
        )}
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
            style={{
              "& > * > * > *": {
                paddingLeft: "1%",
                paddingRight: "1%",
              },
            }}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  cellDataGetter={this.cellDataGetter}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTableMui = withStyles(styles)(MuiVirtualizedTable);

// ---

export default function ReactVirtualizedTable(props) {
  const { rows, columns } = props;
  return (
    <VirtualizedTableMui
      rowCount={rows.length}
      rowGetter={({ index }) => rows[index]}
      columns={columns}
      {...props}
    />
  );
}
