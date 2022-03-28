const express = require('express');
const next = require('next');

const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const HOST = 'https://gorest.co.in/public';
    const PORT = process.env.PORT || 4000;

    console.log('host', HOST);

    server.use(
      '*',
      createProxyMiddleware({
        target: HOST,
        changeOrigin: true,
      })
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (e) => {
      if (e) {
        throw e;
      }
      console.log(`Ready on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log('error', e.stack);
    process.exit(1);
  });
