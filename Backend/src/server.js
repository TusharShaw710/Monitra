import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  console.log(`Smart Website Monitoring API is running in ${env.nodeEnv} mode on port ${env.port}.`);
});
