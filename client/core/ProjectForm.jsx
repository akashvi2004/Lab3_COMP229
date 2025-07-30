import React, { useState } from "react";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { create } from "./api-project"; // You'll write this function
import auth from "../lib/auth-helper";

const ProjectForm = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    link: "",
    error: "",
    success: false,
  });

  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = () => {
    const project = {
      title: values.title || undefined,
      description: values.description || undefined,
      link: values.link || undefined,
    };

    create(project, { t: jwt.token }).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, title: "", description: "", link: "", success: true });
      }
    });
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6">Add New Project</Typography>
        <TextField fullWidth margin="normal" label="Title" value={values.title} onChange={handleChange("title")} />
        <TextField fullWidth margin="normal" label="Description" multiline rows={3} value={values.description} onChange={handleChange("description")} />
        <TextField fullWidth margin="normal" label="Project Link" value={values.link} onChange={handleChange("link")} />
        {values.error && <Typography color="error">{values.error}</Typography>}
        {values.success && <Typography color="primary">✅ Project created successfully!</Typography>}
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Create</Button>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
