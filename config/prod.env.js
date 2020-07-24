'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv,{
  NODE_ENV: '"production"',
  SERV_ADDR:'"https://iclub-pads.gtmc.com.cn/api"',
  SERV_WECHAT:'"https://test.icheyou.net/osapi"'
}
  
)
