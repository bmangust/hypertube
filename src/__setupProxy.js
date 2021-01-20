const { createProxyMiddleware } = require('http-proxy-middleware');
const ip = 'localhost';
const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const host = dev ? ip : process.env.REACT_APP_PROJECT_HOST;
const port = 4000;

const url = dev ? `http://${host}:${port}` : `https://${host}`;

module.exports = function (app) {
  app.use(
    '/user/auth/',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/user/create/',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  // app.use(
  //   '/api/chat/',
  //   createProxyMiddleware({
  //     target: url,
  //     changeOrigin: true,
  //   })
  // );
};
