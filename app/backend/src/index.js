const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for now (later we'll move this to Postgres)
let requests = [];

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Create a new service request
app.post("/api/requests", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const newRequest = {
    id: requests.length + 1,
    title,
    description,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  requests.push(newRequest);
  res.status(201).json(newRequest);
});

// List all service requests
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});

