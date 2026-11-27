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

const mongodbUri = process.env.MONGODB_URI?.trim();

if (!mongodbUri) {
  throw new Error('Missing required MONGODB_URI configuration. Set it in your .env file.');
}

const mongoSchemeMatch = mongodbUri.match(/^(mongodb(?:\+srv)?):\/\//i);

if (!mongoSchemeMatch) {
  throw new Error('Invalid MONGODB_URI configuration. Expected a mongodb:// or mongodb+srv:// URI.');
}

const protocol = `${mongoSchemeMatch[1].toLowerCase()}:`;
const isSrvUri = protocol === 'mongodb+srv:';
const authority = mongodbUri.slice(mongoSchemeMatch[0].length).split(/[/?#]/, 1)[0];
const hosts = authority.slice(authority.lastIndexOf('@') + 1);

if (!hosts) {
  throw new Error('Invalid MONGODB_URI configuration. Check that it is a complete MongoDB connection URI.');
}

if (isSrvUri && hosts.includes(':')) {
  throw new Error('Invalid MONGODB_URI configuration. mongodb+srv:// URIs must not specify a port.');
}

export const env = {
  port,
  nodeEnv,
  frontendUrl,
  mongodbUri,
};
