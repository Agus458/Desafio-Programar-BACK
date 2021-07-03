import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import departmentRoutes from "./routes/department.routes";
import locationRoutes from "./routes/location.routes";

const app = express();

/* ----- DataBase Connection ----- */

import './database';

/* ----- Middlewares ----- */

// Enable connection between diferent servers
app.use(cors());

// Request and Response Logger
app.use(morgan("dev"));

// Allows JSON interpretation.
app.use(express.json());

/* ----- Routes ----- */

// Auth Routes
app.use('/api/auth', authRoutes);

// User Routes
app.use('/api/users', userRoutes);

// Department Routes
app.use('/api/departments', departmentRoutes);

// Location Routes
app.use('/api/locations', locationRoutes);

export default app;