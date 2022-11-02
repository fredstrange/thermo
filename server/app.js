import express from "express";
import next from "next";
import apiRoutes from "./routes";
import DB from "./db";

const App = async ({ dev, devices, groups }) => {
  const server = express();
  const app = next({ dev });
  const webHandler = app.getRequestHandler();

  const db = DB();

  await app.prepare();
  server.use("/api", apiRoutes({ devices, groups, db }));
  server.get("*", webHandler);

  return server;
};

export default App;
