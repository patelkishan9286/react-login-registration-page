// Login.js
import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleTogglePass = (name) => {
    setShowPass({
      ...showPass,
      [name]: !showPass[name],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorState = false;
    let helperState = "";

    if (!value) {
      errorState = true;
      helperState = "This field is required";
    } else if (name === "firstName" || name === "lastName") {
      const regex = /^[A-Za-z]*$/;
      if (!regex.test(value)) {
        errorState = true;
        helperState = "Name fields must contain only letters";
      }
    } else if (name === "email") {
      const regex = /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[A-Z|a-z]{0,}$/;
      if (value && !regex.test(value)) {
        errorState = true;
        helperState = "Please enter a valid email address";
      }
    } else if (name === "password") {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!regex.test(value)) {
        errorState = true;
        helperState =
          "Password should be minimum eight characters, at least one letter, one number and one special character";
      }
    } else if (name === "confirmPassword") {
      if (value !== values.password) {
        errorState = true;
        helperState = "Confirm password should match with password";
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorState });
    setHelperText({ ...helperText, [name]: helperState });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormEmpty = Object.values(values).some((value) => value === "");

    if (
      !isFormEmpty &&
      Object.values(errors).every((error) => error === false)
    ) {
      setUser(values);
      navigate("/profile");
    } else {
      alert(
        "There are errors in the form. Please correct them before submitting."
      );
    }
  };

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
          <Typography variant="h4" component="h4" align="center" gutterBottom>
            Login Page
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={2}>
              {["firstName", "lastName", "email"].map((field) => (
                <Grid item key={field}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    variant="outlined"
                    value={values[field]}
                    onChange={handleChange}
                    name={field}
                    type="text"
                    error={errors[field]}
                    helperText={helperText[field]}
                  />
                </Grid>
              ))}
              {["password", "confirmPassword"].map((field) => (
                <Grid item key={field}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    variant="outlined"
                    value={values[field]}
                    onChange={handleChange}
                    name={field}
                    type={showPass[field] ? "text" : "password"}
                    error={errors[field]}
                    helperText={helperText[field]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePass(field)}
                            edge="end"
                          >
                            {showPass[field] ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ))}
              <Grid item>
                <Button fullWidth variant="contained" type="submit">
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}
