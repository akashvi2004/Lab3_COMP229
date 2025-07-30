import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

const isActive = (location, path) =>
  location.pathname === path ? "#ff4081" : "#ffffff";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MERN Skeleton
        </Typography>

        {/* Home */}
        <Link to="/">
          <IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
            <HomeIcon />
          </IconButton>
        </Link>

        {/*  Users */}
        <Link to="/users">
          <Button sx={{ color: isActive(location, "/users") }}>Users</Button>
        </Link>

        {/* Education list link (always visible) */}
        <Link to="/education">
          <Button sx={{ color: isActive(location, "/education") }}>
            Education
          </Button>
        </Link>

        <Link to="/projects">
          <Button sx={{ color: isActive(location, "/projects") }}>
            Projects
          </Button>
        </Link>

        {/* If logged in */}
{auth.isAuthenticated() && (
  <>
    <Link to={`/user/${auth.isAuthenticated().user._id}`}>
      <Button
        sx={{
          color: isActive(
            location,
            `/user/${auth.isAuthenticated().user._id}`
          ),
        }}
      >
        My Profile
      </Button>
    </Link>

    {/* Only Admin sees Add Education */}
    {auth.isAuthenticated().user.role === "admin" && (
      <>
        <Link to="/education/add">
          <Button sx={{ color: isActive(location, "/education/add") }}>
            Add Education
          </Button>
        </Link>

        <Link to="/projects/new">
          <Button sx={{ color: isActive(location, "/projects/new") }}>
            Add Project
          </Button>
        </Link>
      </>
    )}

    <Button
      sx={{ color: "#ffffff" }}
      onClick={() => {
        auth.clearJWT(() => navigate("/"));
      }}
    >
      Sign out
    </Button>
  </>
)}

      </Toolbar>
    </AppBar>
  );
}
