import axios from 'axios'
import keys from '../../keys.json' assert { type: 'json' }
import dayjs from 'dayjs'

const { client_id, client_secret, username, password } = keys

const authClient = axios.create({
  baseURL: 'https://api.netatmo.com/',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
})

export default function oauth2() {
  let accessToken = undefined
  let refreshToken = undefined
  let expiresAt = 0

  async function requestNewToken() {
    try {
      const resp = await authClient({
        method: 'post',
        url: 'oauth2/token',
        data: {
          grant_type: 'password',
          client_id,
          client_secret,
          username,
          password,
          scope: 'read_station',
        },
      })

      accessToken = resp.data.access_token
      refreshToken = resp.data.refresh_token
      expiresAt = dayjs().add(resp.data.expires_in, 's')
    } catch (error) {
      console.log('failed to authenticate and retrieve an access token')

      accessToken = undefined
      refreshToken = undefined
      expiresAt = 0
    }
  }

  async function refreshAccessToken() {
    try {
      const resp = await authClient({
        method: 'post',
        url: 'oauth2/token',
        data: {
          grant_type: 'refresh_token',
          client_id,
          client_secret,
          refresh_token: refreshToken,
        },
      })

      accessToken = resp.data.access_token
      refreshToken = resp.data.refresh_token
      expiresAt = dayjs().add(resp.data.expires_in, 's')

      return accessToken
    } catch (error) {
      console.log('failed to refresh access token')
      return undefined
    }
  }

  async function getActiveToken() {
    const hasAccessTokenExpired = dayjs().isAfter(dayjs(expiresAt))
    let token

    if (!hasAccessTokenExpired) return accessToken
    if (refreshToken) {
      token = await refreshAccessToken()
    }

    if (!token) await requestNewToken()

    return accessToken
  }

  return {
    getActiveToken,
  }
}
