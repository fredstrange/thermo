import Thermometers from "../lib/thermometers";

function Temperatures(devices = [], groups = [], Temperatures) {
  const thermometers = Thermometers(devices, Temperatures);

  return async (req, res) => {
    const temperatures = await thermometers.getTemperatures();
    res.json({ groups, temperatures });
  };
}
export default Temperatures;
