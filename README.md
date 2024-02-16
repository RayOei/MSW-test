# Getting Started

Based on This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

>All on MacOS 14.3.1
>MB Pro M2-Max

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

```bash
yarn add msw --dev
yarn add fast-text-encoding --dev  
yarn add react-native-url-polyfill --dev
```

## Run

### Terminal 1

```bash
yarn start --reset-cache
```

### Terminal 2

```bash
detox test [-l trace] -c ios.sim.debug starter.test.js 
```
