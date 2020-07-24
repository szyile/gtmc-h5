'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv,{
  NODE_ENV: '"testMy"',
  SERV_ADDR:'"http://61.136.101.202:6580/api"',  //SERV_ADDR:'"https://test.icheyou.net/devapi"',
  SERV_WECHAT:'"http://61.136.101.202:6580/osapi"'  //SERV_WECHAT:'"https://test.icheyou.net/osapi"'
}

)
