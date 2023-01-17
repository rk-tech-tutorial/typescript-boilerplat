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

class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.globalMiddelwares();
    this.initErrorHandling();
    connectDatabase();
    this.initRoutes();
    this.startServer();
  }

  private globalMiddelwares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
    this.app.use(compression());
    this.app.use(morgan("combined"));

    this.app.use(passport.initialize());
    passportConfigure(passport);
  }

  private initRoutes() {
    this.app.use("/api/v1", router);
    this.app.get("/", (_req, res) => {
      res.send({
        name: packageJson.name,
        version: packageJson.version
      });
    });
  }

  private initErrorHandling() {
    this.app.use(errorHandler);
  }

  private startServer() {
    this.app.set("port", process.env.PORT || 8000);

    this.app.listen(this.app.get("port"), () => {
      console.info(`API Server running at http://localhost:${this.app.get("port")} (${process.env.NODE_ENV})`);
    });
  }
}

export const app = new App();
