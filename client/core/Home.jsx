import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import unicornbikeImg from "./../assets/images/unicornbikeImg.jpg";
import auth from "../lib/auth-helper.js";

const Home = () => {
  const theme = useTheme();
  const isLoggedIn = auth.isAuthenticated();

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "auto",
        mt: 5,
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          color: theme.custom?.openTitle || theme.palette.primary.main,
        }}
      >
        Welcome to MERN Skeleton App
      </Typography>

      <CardMedia
        sx={{ minHeight: 400 }}
        image={unicornbikeImg}
        title="Unicorn Bike"
      />

      <CardContent>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This is a basic full-stack MERN app with user auth, protected routes,
          and CRUD functionality.
        </Typography>

        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            component={Link}
            to="/education"
            sx={{ width: "50%" }}
          >
            Go to Education
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/users"
            sx={{ width: "50%" }}
          >
            View All Users
          </Button>

          {!isLoggedIn && (
            <>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                sx={{ width: "50%" }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signin"
                sx={{ width: "50%" }}
              >
                Sign In
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button
                variant="contained"
                component={Link}
                to="/dashboard"
                sx={{ width: "50%" }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to={`/user/${isLoggedIn.user._id}`}
                sx={{ width: "50%" }}
              >
                My Profile
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Home;
