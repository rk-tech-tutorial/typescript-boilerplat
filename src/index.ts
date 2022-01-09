import "./alias"; // aliases
import "./env"; // env setup

import { app } from "./app";

const server = app.listen(app.get("port"), () => {
  console.info(`API Server running at http://localhost:${app.get("port")} (${process.env.NODE_ENV})`);
});

export default server;
