import React, { useEffect, useState } from "react";
import auth from "../lib/auth-helper";
import { Button } from "@mui/material";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const jwt = auth.isAuthenticated();

  const fetchProjects = () => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt.token}`
        }
      });

      const data = await res.json();
      if (data.error) alert(data.error);
      else {
        alert("Project deleted");
        fetchProjects(); // refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {p.link && (
            <p>
              🔗 <a href={p.link}>{p.link}</a>
            </p>
          )}
          <p><strong>Technologies:</strong> {p.technologies?.join(", ")}</p>

          {/* Admin-only Delete */}
          {jwt?.user?.role === "admin" && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
