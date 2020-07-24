'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERV_ADDR:'"/api-fetchcar"',
  SERV_WECHAT:'"/api-wechat"'
})
