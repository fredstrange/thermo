import client from 'prom-client'
const collectDefaultMetrics = client.collectDefaultMetrics
//const Registry = client.Registry;
//const register = new Registry();
collectDefaultMetrics()

export default client
