import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-prxu.onrender.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error || "Login Failed");
    }
  };
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        margin="normal"
        varient="outlined"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        margin="normal"
        varient="outlined"
      />
      {error && (
        <Box color="red" my={1}>
          {error}
        </Box>
      )}

      <button
        onClick={handleLogin}
        varient="container"
        color="primary"
        fullwidth
        sx={{ mt: 2 }}
      >
        Login
      </button>
      <Box mt={2}>
        Don't have an account{" "}
        <Link to="/signup" className="text-blue-600 font-semibold">
          Signup
        </Link>
      </Box>
    </Box>
  );
}
