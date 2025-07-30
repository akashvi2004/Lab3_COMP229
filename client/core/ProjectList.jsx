// /core/ProjectList.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { getProjects } from "./api-project.js"; // We'll create this next

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => {
      if (data?.error) {
        console.error(data.error);
      } else {
        setProjects(data);
      }
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                {project.link && (
                  <Button
                    size="small"
                    color="primary"
                    href={project.link}
                    target="_blank"
                  >
                    View
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
