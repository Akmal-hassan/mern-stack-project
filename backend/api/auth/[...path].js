import app, { startup } from '../../server.js';

export default async function handler(req, res) {
  await startup;
  return app(req, res);
}
