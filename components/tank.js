export default ({ label = '', temperatures = [] }) => (
  <div className='container'>
    <style jsx>{`
      .container {
        margin: 10px
      }
    `}</style>
    <h2>{label}</h2>
    {temperatures.map(temperature => (
      <div>
        {temperature &&
          <span className='row'>{`${temperature.label}: ${temperature.temperature} °C`}</span>}
      </div>
    ))}
  </div>
)
