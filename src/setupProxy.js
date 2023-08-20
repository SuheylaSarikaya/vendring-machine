const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'httpss://app-vending-machine-1-4d0474825892.herokuapp.com',
      changeOrigin: true,
    })
  );
};