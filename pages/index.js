import React from 'react'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { data } = await axios
      .get(`http://${req.headers.host}/api/temperatures`)
      .catch(e => {
        console.log(e)
      })

    return { data }
  }

  render () {
    const groups = this.props.data

    return (
      <div>
        {Object.keys(groups).map(group => (
          <div>
            <div>Group: {group}</div>
            {groups[group].map(thermometer => (
              <div>
                <span>{thermometer.label}: </span>
                <span>{thermometer.celsius} C</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
