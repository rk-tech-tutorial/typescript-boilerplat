import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { connectDatabase } from "@configs";
import { router } from "./routes";
import { errorHandler } from "@middlewares/errorHandler";
import { passportConfigure } from "@helpers/auth/jwtValidator";

// package.json
const packageJson = require("../package.json");

const app = express();

// Helmet Setup
app.use(helmet());

// CORS Setup
// if (!inProduction()) {
app.use(cors());
// }

// Port setup
app.set("port", process.env.PORT || 8000);

// Body Parser
// FIXME: Make limit to 5mb
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Compression - gzip
app.use(compression());

// Logger
app.use(morgan("combined"));

// Passport Setup
app.use(passport.initialize());
passportConfigure(passport);

// Connect Database: MONGO
connectDatabase();

app.get("/", (_req, res) => {
  res.send({
    name: packageJson.name,
    version: packageJson.version
  });
});

// Routes
app.use("/api/v1", router);

// app.use(errors());
app.use(errorHandler); // custom error handler

export { app };
