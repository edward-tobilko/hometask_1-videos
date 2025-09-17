import express from 'express';

import { setupApp } from './app';

const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
