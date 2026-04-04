import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
