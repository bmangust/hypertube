const createProxyMiddleware = require('http-proxy-middleware');
const ip = 'localhost';
const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const host = dev ? ip : process.env.REACT_APP_PROJECT_HOST;
const port = 4000;

const url = dev ? `http://${host}:${port}` : `https://${host}`;

module.exports = function (app) {
  app.use(
    '/api/auth/',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/profile/',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/passwd/',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/search/',
    createProxyMiddleware({
      target: 'http://localhost:2222',
      pathRewrite: { '^/api/search': '' },
      changeOrigin: true,
    })
  );
  app.use(
    '/api/movies/',
    createProxyMiddleware({
      target: 'http://localhost:2223',
      pathRewrite: { '^/api/movies': '' },
      changeOrigin: true,
    })
  );
  app.use(
    '/api/loader',
    createProxyMiddleware({
      // target: 'http://localhost:8000',
      target: 'http://192.168.43.222:8080',
      pathRewrite: { '^/api/loader': '/api/storage/load' },
      changeOrigin: true,
    })
  );
  app.use(
    '/api/test/',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    })
  );
};
