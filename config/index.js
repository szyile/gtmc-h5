'use strict'
// Template version: 1.2.5
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            //订单服务
            '/api-fetchcar': {    
                // target: 'https://test.icheyou.net/devapi', // 接口的域名       
                //target: 'https://iclub-padstest.gtmc.com.cn/api', // 广丰接口的域名       
                target: 'http://127.0.0.1:8000/',  // 本机 bff接口域名
                //target: 'http://61.136.101.202:8000/',  // 测试环境 bff接口域名
                changeOrigin: true, // 是否跨域       
                pathRewrite: {      
                    '^/api-fetchcar': ''    
                }  
            },
            //模拟小程序url
            '/api-wechat': {    
                //target: 'https://test.icheyou.net/osapi', // 接口的域名       
                target: 'http://127.0.0.1:8000/',  // 本机 bff接口域名
                //target: 'http://61.136.101.202:8000/',  // 测试环境 bff接口域名
                changeOrigin: true, // 是否跨域       
                pathRewrite: {      
                    '^/api-wechat': ''    
                }  
            }
        },

        // Various Dev Server settings
        host: '127.0.0.1', // can be overwritten by process.env.HOST
        // host: 'localhost', // can be overwritten by process.env.HOST
        port: 6580, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },
    testMy: {
        // Template for index.html
        index: path.resolve(__dirname, '../h5-pads/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../h5-pads'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    testGtmc: {
        // Template for index.html
        index: path.resolve(__dirname, '../h5-pads/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../h5-pads'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../h5-pads/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../h5-pads'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
