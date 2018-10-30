import React from 'react'
import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import {
  HighchartsChart,
  Chart,
  AreaSeries,
  withHighcharts,
  XAxis,
  YAxis,
  Tooltip
} from 'react-jsx-highcharts'
import moment from 'moment'

const chart = ({ data = [] }) => {
  const options = {
    spline: {
      lineWidth: 4,
      states: {
        hover: {
          lineWidth: 5
        }
      },
      marker: {
        enabled: true
      }
    }
  }

  return (
    <div>
      <HighchartsChart plotOptions={options}>
        <Chart height={300} />
        <Tooltip />
        <XAxis type='datetime'>
          <XAxis.Title>Time</XAxis.Title>

        </XAxis>

        <YAxis>
          <YAxis.Title>Temperature</YAxis.Title>
          {data.map(d => (
            <AreaSeries
              key={d.name}
              name={d.name}
              data={d.data}
              fillOpacity='0.25'
            />
          ))}
        </YAxis>
      </HighchartsChart>
    </div>
  )
}

export default withHighcharts(chart, Highcharts)
