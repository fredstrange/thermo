import TemperaturesController from "./controllers/temperatures";

function DB() {
  const Temperatures = TemperaturesController();

  return {
    Temperatures,
  };
}

export default DB;
