import React, { useEffect, useState } from "react";
import auth from "../lib/auth-helper"; 
import { Button } from "@mui/material";

export default function EducationList() {
  const [educations, setEducations] = useState([]);
  const jwt = auth.isAuthenticated();

  const fetchEducation = () => {
    fetch("http://localhost:3000/api/educations")
      .then((res) => res.json())
      .then((data) => setEducations(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/educations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt.token}`
        }
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Education deleted");
        fetchEducation(); // refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Education</h2>
      {educations.map((edu) => (
        <div
          key={edu._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{edu.title}</h3>
          <p>
            <strong>Institution:</strong> {edu.institution}
          </p>
          <p>
            <strong>Duration:</strong>{" "}
            {new Date(edu.startDate).toDateString()} -{" "}
            {edu.endDate ? new Date(edu.endDate).toDateString() : "Present"}
          </p>
          <p>{edu.description}</p>

          {/* Admin-only actions */}
          {jwt?.user?.role === "admin" && (
            <div style={{ marginTop: "10px" }}>
              {/* Future: Edit button */}
              <Button
                variant="outlined"
                size="small"
                sx={{ marginRight: "10px" }}
                onClick={() => alert("Edit functionality coming soon!")}
              >
                Edit
              </Button>

              {/* Delete button */}
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(edu._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
