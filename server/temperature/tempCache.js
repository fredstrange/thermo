const TEMP_THRESHOLD = 0.5;
let db;

function init() {
  db = {};
}

function TemperatureCache(address, theshold = TEMP_THRESHOLD) {
  function getAddress() {
    return address;
  }

  function setTemperature(temperature) {
    if (!db) init();
    if (!db[address])
      db[address] = {
        lastSent: 0,
        current: 0,
      };
  }

  function hasChanged() {
    return (
      Math.abs(db[address].lastSent - db[address].current) > TEMP_THRESHOLD
    );
  }

  function setCurrentAsSent() {
    db[address].lastSent = db[address].current;
  }

  return { setTemperature, hasChanged, setCurrentAsSent };
}

export default TemperatureCache;
