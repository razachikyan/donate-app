import cookieParser from "cookie-parser";
import Routes from "./routes";
import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Name",
      version: "1.0.0",
      description: "API documentation for your application",
      contact: {
        name: "Your Name",
        email: "your_email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 4000;

app.use("/", Routes);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
