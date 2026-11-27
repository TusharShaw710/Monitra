import dotenv from 'dotenv';

dotenv.config();

const portValue = process.env.PORT ?? '3000';
const port = Number(portValue);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Invalid PORT configuration. PORT must be an integer between 1 and 65535.');
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const allowedNodeEnvironments = ['development', 'production', 'test'];

if (!allowedNodeEnvironments.includes(nodeEnv)) {
  throw new Error(`Invalid NODE_ENV configuration. Use one of: ${allowedNodeEnvironments.join(', ')}.`);
}

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

try {
  new URL(frontendUrl);
} catch {
  throw new Error('Invalid FRONTEND_URL configuration. Provide a valid URL.');
}

export const env = {
  port,
  nodeEnv,
  frontendUrl,
};
