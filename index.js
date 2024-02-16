/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

async function enableMocking() {
  AppRegistry.registerComponent(appName, () => App);

  if (!__DEV__) {
    return;
  }
  console.log('LOADING.......');
  await import('./e2e/msw.polyfills');
  console.log('Import.......');
  const {server} = await import('./e2e/mocks/server');
  console.log('Server.......');
  server.listen();
  console.log('Server listening.......');
  server.listHandlers();
}

enableMocking().then(() => {
  AppRegistry.registerComponent(appName, () => App);
  console.log('MSW started.......');
});
