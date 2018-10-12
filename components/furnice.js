export default ({ label, temperatures = [] }) => (
  <div className='container'>
    <style jsx>{`
    .container {
      margin: 10px
    }
  `}</style>
    <h2>{label}</h2>
    {temperatures.map(temperature => (
      <div>{`${temperature.label}: ${temperature.temperature} °C`}</div>
    ))}
  </div>
)
