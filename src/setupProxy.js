// 配置代理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use('/api', createProxyMiddleware({
    target: 'https://m.maoyan.com/',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }))

  app.use('/dss', createProxyMiddleware({
    target: 'https://dss1.bdstatic.com/',
    changeOrigin: true,
    pathRewrite: {
      "^/dss": "/"
    }
  }))
};