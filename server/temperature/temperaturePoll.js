const INTERVAL = 30000;
let timer = null;
const { readTemperature } = require("./thermometerReader").default;
const cache = require("./tempCache").default;
const { is } = require("ramda");
const TemperatureCache = require("./tempCache").default;
const thermometers = [];

// if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(readTemperature, INTERVAL)

function registerThermomiter(address) {
  thermometers.push(new TemperatureCache(address));
}

async function updateAddress(temperatureTpl) {
  addTemperature(...temperatureTpl);
}

async function checkaddresses(addresses) {
  if (!is(Array, addresses)) return [];
  const temperatures = await Promise.all(addresses.map(checkaddress));
  return temperatures;
}

async function checkaddress(address) {
  const temperature = await readTemperature(address);
  return { address, temperature };
}
