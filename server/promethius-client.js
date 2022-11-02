import client from "prom-client";
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

const { Gauge, Histogram, Counter } = client;

export { Gauge, Histogram, Counter };
