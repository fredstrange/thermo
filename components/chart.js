import React from 'react'
import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  LineSeries,
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
    },
    yAxis: {
      min: 0
    }
  }

  return (
    <div>
      <HighchartsChart plotOptions={options}>
        <Chart height={150} />
        <Tooltip />
        <XAxis type='datetime'>
          <XAxis.Title>Time</XAxis.Title>

        </XAxis>

        <YAxis>
          <YAxis.Title>Temperature</YAxis.Title>
          {data.map(d => (
            <LineSeries key={d.name} name={d.name} data={d.data} />
          ))}
        </YAxis>
      </HighchartsChart>
    </div>
  )
}

export default withHighcharts(chart, Highcharts)
