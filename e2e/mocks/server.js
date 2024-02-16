import {setupServer} from 'msw/native';
import {handlers} from './handlers';

const server = setupServer(...handlers);

server.events.on('request:start', ({request}) => {
  console.log('Outgoing:', request.method, request.url);
});
export {server};
