import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';
import Api from './utils/apiRes.util';
import projectRouter from './routes/project.route';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1/projects", projectRouter);

app.get("/", (req, res) => {
  Api.success(res, null, "Welcome to the API");
});


// 404 handler
app.use((req, res) => {
  Api.error(res, null, "Endpoint not found", 404);
});


// global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  const status = err?.statusCode || 500;
  Api.error(res, err, "Internal Server Error", status);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});