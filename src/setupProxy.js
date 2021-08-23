// 配置代理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use('/api', createProxyMiddleware({
    target: '192.168.8.160:8022',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }))
};