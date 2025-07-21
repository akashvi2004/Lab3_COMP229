import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import auth from "../lib/auth-helper";

export default function AddEducation() {
  const [values, setValues] = useState({
    title: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: "",
    error: "",
    success: ""
  });

  const jwt = auth.isAuthenticated();

  // Block normal users
  if (!jwt || jwt.user.role !== "admin") {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>🚫 Unauthorized: Admins only</h3>;
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    const educationData = {
      title: values.title,
      institution: values.institution,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description
    };

    try {
      const response = await fetch("http://localhost:3000/api/educations", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`
        },
        body: JSON.stringify(educationData)
      });

      const data = await response.json();
      if (data.error) {
        setValues({ ...values, error: data.error, success: "" });
      } else {
        setValues({
          title: "",
          institution: "",
          startDate: "",
          endDate: "",
          description: "",
          error: "",
          success: " Education record added successfully!"
        });
      }
    } catch (err) {
      console.error("Error adding education:", err);
      setValues({ ...values, error: "Something went wrong!", success: "" });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "30px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6">Add Education</Typography>

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          label="Institution"
          fullWidth
          margin="normal"
          value={values.institution}
          onChange={handleChange("institution")}
        />
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={values.startDate}
          onChange={handleChange("startDate")}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={values.endDate}
          onChange={handleChange("endDate")}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={values.description}
          onChange={handleChange("description")}
        />

        {values.error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {values.error}
          </Typography>
        )}
        {values.success && (
          <Typography color="primary" sx={{ mt: 1 }}>
            {values.success}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
