import ThermometerReader from './thermometerReader.js'

export default function Thermometer(device, temperatureHist) {
  const { address, label, index, group } = device

  async function readTemperature() {
    const temp = await ThermometerReader.readTemperature(address)
    temperatureHist.labels({ label, group, index }).set(temp)
  }

  return {
    readTemperature,
  }
}
