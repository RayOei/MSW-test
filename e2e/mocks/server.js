import {setupServer} from 'msw/native';
import {handlers} from './handlers';

const server = setupServer(...handlers);

server.events.on('request:start', ({request}) => {
  console.log('Outgoing:', request.method, request.url);
});

server.events.on('request:match', ({request}) => {
  console.log('Matched:', request.method, request.url);
});

server.events.on('response:mocked', ({request, response}) => {
  const payload = response.clone().text();
  const cmd = payload._j;
  console.log(
    'Request: %s %s => Received %s %s => %s',
    request.method,
    request.url,
    response.status,
    response.statusText,
    cmd,
  );
});

export {server};
