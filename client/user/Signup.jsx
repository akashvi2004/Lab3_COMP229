import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  MenuItem
} from "@mui/material";
import { create } from "./api-user.js"; // <-- Make sure your API call is correct
import { Navigate } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role || "user",
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: "", success: true });
      }
    });
  };

  if (values.success) {
    return <Navigate to="/signin" />;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>

        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          fullWidth
        />

        <TextField
          id="role"
          label="Role"
          select
          value={values.role}
          onChange={handleChange("role")}
          margin="normal"
          fullWidth
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        {values.error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={clickSubmit}
          sx={{ mx: "auto", mb: 2 }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
