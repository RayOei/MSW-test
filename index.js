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
  console.log('MSW loading.......');
  await import('./e2e/msw.polyfills');
  console.log('MSW init.......');
  const {server} = await import('./e2e/mocks/server');
  server.listen();
  console.log('MSW listening.......');
  console.log(server.listHandlers());
}

enableMocking().then(() => {
  // This is too late as the "A module failed to load due to an error or AppRegistry.registerComponent wasn't called." error will show
  //AppRegistry.registerComponent(appName, () => App);
  console.log('MSW started.......');
});
