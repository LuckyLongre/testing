import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import connectDB from "./src/config/db.config.js";
import app from "./src/app.js";


const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
