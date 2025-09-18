import express from 'express';

import { setupApp } from './app';

const app = express();
setupApp(app);

const PORT = Number(process.env.PORT) || 5001;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST);

server.on('listening', () => {
  console.log(
    `Server running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`,
  );
});

server.on('error', (err) => {
  console.error('LISTEN ERROR:', err);
  process.exit(1);
});
