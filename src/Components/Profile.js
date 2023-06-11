// Profile.js
import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Container, Grid, Paper } from "@mui/material";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={2} sx={{ padding: 5 }}>
          <Grid item>
            <h2>Profile Page</h2>
          </Grid>
          <Grid item>
            <p>First Name: {user.firstName}</p>
          </Grid>
          <Grid item>
            <p>Last Name: {user.lastName}</p>
          </Grid>
          <Grid item>
            <p>Email: {user.email}</p>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Profile;
