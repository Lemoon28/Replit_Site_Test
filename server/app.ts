// server/app.ts
import express from "express";

const app = express();

// middleware & routes…
app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
