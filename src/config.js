const env = require('dotenv')

const getConfig = () =>
  env.config().parsed

const config = getConfig() || {
  https: false,
  https_privkey: '',
  https_cert: '',
  https_fullchain: ''
}

export default config
