import { zipObj, pluck, values } from "ramda";
import Thermometer from "./thermometerReader";

const indexBy = (key, list) => zipObj(pluck(key, list), values(list));

function Thermometers(devices = [], Temperatures) {
  const thermometers = devices.map((device) =>
    Thermometer({ address: device.address, Temperatures })
  );
  const devicesObject = indexBy("address", devices);

  async function getTemperatures() {
    const data = await Promise.all(
      thermometers.map((thermometer) => thermometer.data())
    );

    return data.reduce((obj, thermometer) => {
      const { temperature, address, createdAt } = thermometer;
      const { index, group, label } = devicesObject[address];

      obj[group] = obj[group] || [];
      obj[group][index] = { temperature, label, createdAt, address };
      return obj;
    }, {});
  }

  return { getTemperatures };
}

export default Thermometers;
