import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import auth from "../lib/auth-helper";

export default function AddProject() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    link: "",
    technologies: "",
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
    const projectData = {
      title: values.title,
      description: values.description,
      link: values.link,
      technologies: values.technologies.split(",").map(t => t.trim())
    };

    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`
        },
        body: JSON.stringify(projectData)
      });

      const data = await res.json();
      if (data.error) {
        setValues({ ...values, error: data.error, success: "" });
      } else {
        setValues({
          title: "",
          description: "",
          link: "",
          technologies: "",
          error: "",
          success: " Project added successfully!"
        });
      }
    } catch (err) {
      console.error("Error adding project:", err);
      setValues({ ...values, error: "Something went wrong!", success: "" });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "30px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6">Add Project</Typography>

        <TextField label="Title" fullWidth margin="normal" value={values.title} onChange={handleChange("title")} />
        <TextField label="Description" fullWidth multiline rows={3} margin="normal" value={values.description} onChange={handleChange("description")} />
        <TextField label="Link (optional)" fullWidth margin="normal" value={values.link} onChange={handleChange("link")} />
        <TextField label="Technologies (comma separated)" fullWidth margin="normal" value={values.technologies} onChange={handleChange("technologies")} />

        {values.error && <Typography color="error">{values.error}</Typography>}
        {values.success && <Typography color="primary">{values.success}</Typography>}

        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}
