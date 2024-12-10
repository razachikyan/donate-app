import cookieParser from "cookie-parser";
import Routes from "./routes";
import express from "express";
import cors from "cors";

import "dotenv/config";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/", Routes);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
