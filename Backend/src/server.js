import app from './app.js';
import { connectToDatabase, disconnectFromDatabase } from './config/db.js';
import { env } from './config/env.js';

let httpServer;
let isShuttingDown = false;

async function startServer() {
  await connectToDatabase();

  // A shutdown signal may arrive while the initial database connection is pending.
  if (isShuttingDown) return;

  httpServer = app.listen(env.port, () => {
    console.log(`Smart Website Monitoring API is running in ${env.nodeEnv} mode on port ${env.port}.`);
  });

  httpServer.on('error', (error) => {
    console.error(`HTTP server failed: ${error.message}`);
    void shutdown(1);
  });
}

async function shutdown(exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('Shutting down gracefully...');

  try {
    if (httpServer?.listening) {
      await new Promise((resolve, reject) => {
        httpServer.close((error) => (error ? reject(error) : resolve()));
      });
    }

    await disconnectFromDatabase();
    console.log('HTTP server and MongoDB connection closed.');
    process.exitCode = exitCode;
  } catch {
    console.error('Graceful shutdown encountered an error.');
    process.exitCode = 1;
  }
}

process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());

startServer().catch(async () => {
  console.error('Server startup failed. The API was not started. Check MongoDB configuration and connectivity.');
  await shutdown(1);
});
