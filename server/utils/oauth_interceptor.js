import oauth2 from './oauth2.js'

const authClient = oauth2()

export default async function authInterceptor(config) {
  const accessToken = await authClient.getActiveToken()

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}
