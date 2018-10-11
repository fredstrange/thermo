export default ({ label, temperatures = [] }) => (
  <div className='container'>
    <style jsx>{`
      .container {
        margin: 10px
      }
    `}</style>
    <h2>{label}</h2>
    {temperatures.map(temperature => (
      <div className='row'>{`${temperature.label}: ${temperature.celsius} C°`}</div>
    ))}
  </div>
)
