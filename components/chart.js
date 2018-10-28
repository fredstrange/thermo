import { AreaChart, XAxis, Area, Tooltip, YAxis, CartesianGrid } from 'recharts'
import moment from 'moment'

export default ({ data = [] }) => (
  <AreaChart
    width={700}
    height={150}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis
      dataKey='time'
      tickFormatter={time => moment(time).format('HH:mm')}
      tickCount={10}
      type='number'
      domain={['auto', 'auto']}
    />
    <YAxis />
    <Tooltip
      formatter={(value, name, props) => {
        return value
      }}
    />
    <Area
      type='monotone'
      dataKey='temperature'
      stroke='#8884d8'
      fillOpacity={1}
      fill='url(#colorUv)'
    />
  </AreaChart>
)
