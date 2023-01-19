import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import passport from "passport";
import { connectDatabase } from "@configs";
import controllers from "./controllers";
import { passportConfigure } from "@helpers/auth/jwtValidator";

import { useExpressServer } from "routing-controllers";
import { middlewares } from "./middlewares";
import { changeResponse } from "./interceptor";

// package.json
const packageJson = require("../package.json");

class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.globalMiddelwares();
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
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      middlewares,
      interceptors: [changeResponse],
      controllers
    });
  }

  private startServer() {
    this.app.set("port", process.env.PORT || 8000);

    this.app.listen(this.app.get("port"), () => {
      console.info(`API Server running at http://localhost:${this.app.get("port")} (${process.env.NODE_ENV})`);
    });
  }
}

export const app = new App();
