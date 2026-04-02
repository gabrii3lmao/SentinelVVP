import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;


const corstOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true
}

app.use(cors(corstOptions));
app.use(express.json());
app.use(cookieParser());


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
