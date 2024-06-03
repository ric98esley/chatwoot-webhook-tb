import express from 'express';
import morgan from 'morgan';

import router from './api/routes/index.js';
import { apiConfig } from './config.js';
const PORT = apiConfig.port;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// Config API routes
const baseUrl = router(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}${baseUrl}`);
});

