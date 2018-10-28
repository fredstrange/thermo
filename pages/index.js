import React from 'react'
import axios from 'axios'
import Furnace from '../components/furnice'
import Tank from '../components/tank'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { data } = await axios
      .get(`http://${req.headers.host}/api/temperatures`)
      .catch(e => ({ data: {} }))

    const { data: series } = await axios
      .get(`http://${req.headers.host}/api/series`)
      .catch(e => ({}))

    return { data, series }
  }

  render () {
    const { data: { groups = [], temperatures }, series } = this.props

    return (
      <div>
        {groups.map(group => {
          const isFurnace = group.type === 'furnace'
          const isTank = group.type === 'tank'

          return (
            <div key={group.label + group.id}>
              {isFurnace &&
                <Furnace
                  label={group.label}
                  temperatures={temperatures[group.id]}
                />}
              {isTank &&
                <Tank
                  label={group.label}
                  temperatures={temperatures[group.id]}
                  series={series}
                />}
            </div>
          )
        })}
      </div>
    )
  }
}
