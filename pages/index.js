import React from 'react'
import axios from 'axios'
import Furnace from '../components/furnice'
import Tank from '../components/tank'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { data } = await axios
      .get(`http://${req.headers.host}/api/temperatures`)
      .catch(e => {
        console.log(e)
        return { data: {} }
      })

    return { data }
  }

  render () {
    const { groups = [], temperatures } = this.props.data

    return (
      <div>
        {groups.map(group => {
          const isFurnace = group.type === 'furnace'
          const isTank = group.type === 'tank'

          return (
            <div>
              {isFurnace &&
                <Furnace
                  label={group.label}
                  temperatures={temperatures[group.id]}
                />}
              {isTank &&
                <Tank
                  label={group.label}
                  temperatures={temperatures[group.id]}
                />}
            </div>
          )
        })}
      </div>
    )
  }
}
