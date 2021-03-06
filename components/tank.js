import moment from 'moment'
import Chart from './chart'

export default ({ label = '', temperatures = [], series = {} }) => {
  const chartData = temperatures.map(temperature => {
    return {
      name: temperature.label,
      data: series[temperature.address]
    }
  })

  return (
    <div className='container'>
      <style jsx>{`
      .container {
        margin: 10px;
      }
      .label {
        margin-block-end: 0.2em; 
        font-size: 1em;
      }
      .number {
        font-size: 1.4em;
        font-weight: bold;
      }
    `}</style>
      <h2>{label}</h2>
      {temperatures.map(temperature => (
        <div key={temperature.address}>
          {temperature &&
            <div>
              <div className='stats'>
                <h3 className='label'>{`${temperature.label}: `}</h3>
                <span className='number'>{`${temperature.temperature} °C`}</span>
                <span> {moment(temperature.createdAt).fromNow()}</span>
              </div>
              <div className='chart'>
   {/*              <Chart
                  data={{
                    name: temperature.label,
                    data: series[temperature.address]
                  }}
                /> */}
              </div>
            </div>}
        </div>
      ))}
      <div className='chart'>
        <Chart data={chartData} />
      </div>
    </div>
  )
}
