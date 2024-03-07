# MSW with React Native

Demo app to illustrate issues with MSW

- [MSW with React Native](#msw-with-react-native)
  - [Issues](#issues)
  - [Demo app](#demo-app)
  - [Environment](#environment)
  - [Installed](#installed)
    - [Detox](#detox)
    - [Msw](#msw)
  - [Run](#run)
    - [Build](#build)
    - [Metro](#metro)
    - [Test](#test)
      - [Logging](#logging)

## Issues

Originally this demo app was made for reported issue [#1](https://github.com/mswjs/msw/issues/2042), but while debugging further, more issues seem to exist with handling of the interception and subsequent handling of the defined responses.

1. It seems the [server.use](./e2e/starter.test.js#68) definition is added to the stack but is not triggered when a call is intercepted
2. It seems the case where [server.resetHandler](./e2e/starter.test.js#66) is used with a new definition, the call is no longer intercepted
3. ~~It seems that handler definition for [fake_reactnative.dev/movies.json](/e2e/mocks/handlers.js#35) is not called when the app is loading while it is expected to be used from the moment `msw` is initialised~~ This is a RN initialisation issue. The `msw` example in the documentation is incorrect and needs improving.
4. It seems that the handler with the definition [once](/e2e/mocks/handlers.js#9) is always called while the expectation is that the 2nd and subsequent calls would trigger the [next definition](/e2e/mocks/handlers.js#17) for `reactnative.dev/movies.json`.

> In short: there seem to be issues with the handling of intercepted calls and the processing of the defined responses.

## Demo app

The app is based on the React Native `Quick starter` demo: [**React Native**](https://reactnative.dev/docs/environment-setup) project. Where a movie list is retrieved. This app has been modified to:

1. Retrieve a fake URL with the [FakeMovies] button
2. Retrieve the real URL with the [GetMovies] button - although the behaviour is controlled by the handlers so the `real` response should not be shown
3. Reset the list with the [Clear] button - no handler or API call is used here

The handling of the specific `fetch` in the [app](./App.tsx) is expanded with error messages, to be shown in the list:

1. for `!response.ok` (e.g. non `2xx`) responses
2. and the `http.error()` response (e.g. no network)

Which can be used to further check the actual behaviour of the defined handler responses.

> No special care has been taken in cleaning up or minimising code duplication :-)


## Environment


- MB Pro M2-Max
- MacOS 14.3.1
- Emulator iOS v17.0.1

## Installed

### Detox

Based on [detox setup](https://wix.github.io/Detox/docs/introduction/environment-setup/)

```bash
brew tap wix/brew
brew install applesimutils

yarn add "jest@^29" --dev
yarn add detox --dev
detox init
```

### Msw

Installation according to [RN integration](https://mswjs.io/docs/integrations/react-native)

```bash
yarn add msw --dev
yarn add fast-text-encoding --dev  
yarn add react-native-url-polyfill --dev
```

## Run

### Build

Run the the Detox build first.

```bash
detox build -c ios.sim.debug
```

### Metro

Start metro session in terminal

```bash
yarn start --reset-cache
```

### Test

Start detox run in seperate terminal

```bash
detox test -l trace -c ios.sim.debug starter.test.js 
```

#### Logging

Check:

1. metro terminal for logging
2. detox terminal for logging (for additional detox logging, see `detox` doc.)

> Note: removed original included logging from this file as that is no longer representative after the app changes.
