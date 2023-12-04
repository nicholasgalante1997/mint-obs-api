import { server } from './server';
import { pino } from './lib';

const PORT = process.env?.PORT || 5001;

server.listen(PORT, () => pino.info('@couch-mint/obs-api process started. Server listening on port ' + PORT));
