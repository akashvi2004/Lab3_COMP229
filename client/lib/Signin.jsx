import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardActions,
  Icon,
} from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../lib/auth-helper";
import { signin } from "../lib/api-auth"; // Update path if needed

export default function Signin() {
  const location = useLocation();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // 👇 Store JWT in sessionStorage and redirect
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const { from } = location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        mt: 5,
        pb: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
          Sign In
        </Typography>

        <TextField
          id="email"
          type="email"
          label="Email"
          sx={{ mx: 1, width: 300 }}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          sx={{ mx: 1, width: 300 }}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />

        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ verticalAlign: "middle", mr: 0.5 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={{ margin: "auto", mb: 2 }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
