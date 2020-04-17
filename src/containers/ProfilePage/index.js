import React from "react";
import { Typography, ThemeProvider, Grid, Box } from "@material-ui/core";
import theme from "../../theme";
import SimpleTabs from "../../components/Navigation/SimpleTabs";
import Navbar from "../../components/Navigation/Navbar";

export default function ProfilePage(props) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Grid
        container
        spacing={2}
        direction="column"
        style={{
          padding: theme.spacing(2),
          marginTop: theme.spacing(5),
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.background.main,
        }}
      >
        <Grid item>
          <Typography
            variant="h2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Box
              fontWeight="bold"
              style={{ marginRight: theme.spacing(1) }}
            >{`Dashboard ${props.match.params.id}`}</Box>
            <Box> {` by Anonymous`}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <SimpleTabs />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
