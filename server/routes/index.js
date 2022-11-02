import { AsyncRouter } from "express-async-router";
import temperatures from "./temperatues";
import series from "./series";

function routes({ devices = [], groups = [], db = {} }) {
  const router = AsyncRouter();
  router.get("/temperatures", temperatures(devices, groups, db.Temperatures));
  router.get("/series", series(devices, groups, db.Temperatures));

  return router;
}

export default routes;
