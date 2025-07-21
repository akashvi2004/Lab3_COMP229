import React from "react"
import auth from "../lib/auth-helper.js" // adjust path if needed

export default function Dashboard() {
  const handleLogout = () => {
    auth.clearJWT(() => {
      window.location.href = "/" // redirect to home after logout
    })
  }

  const jwt = auth.isAuthenticated()

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in as: <b>{jwt.user?.name}</b></p>
      <p>Email: {jwt.user?.email}</p>
      <p>Role: {jwt.user?.role || "User"}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
