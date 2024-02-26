# Getting Started

Based on: This is a new [**React Native**](https://reactnative.dev) project

## Environment

* MB Pro M2-Max
* MacOS 14.3.1
* Emulator iOS v17.0.1

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

#### Metro console

```bash
 BUNDLE  ./index.js 

 LOG  LOADING.......
 LOG  Running "msw_test" with {"rootTag":1,"initialProps":{}}
 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 BUNDLE  e2e/msw.polyfills.js 

 LOG  Import.......
 BUNDLE  e2e/mocks/server.js 

 LOG  Server.......
 LOG  Server listening.......
 LOG  MSW started.......
 BUNDLE  ./index.js 

 BUNDLE  e2e/msw.polyfills.js 

 LOG  LOADING.......
 LOG  Running "msw_test" with {"rootTag":11,"initialProps":{}}
 LOG  ......Starting APP.......
 LOG  Import.......
 BUNDLE  e2e/mocks/server.js 

 LOG  Server.......
 LOG  Server listening.......
 LOG  MSW started.......
 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 BUNDLE  ./index.js 

 BUNDLE  e2e/msw.polyfills.js 

 LOG  LOADING.......
 LOG  Running "msw_test" with {"rootTag":21,"initialProps":{}}
 LOG  ......Starting APP.......
 LOG  Import.......
 BUNDLE  e2e/mocks/server.js 

 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 LOG  Server.......
 LOG  Server listening.......
 LOG  MSW started.......
 BUNDLE  ./index.js 

 BUNDLE  e2e/msw.polyfills.js 

 LOG  LOADING.......
 LOG  Running "msw_test" with {"rootTag":31,"initialProps":{}}
 LOG  ......Starting APP.......
 LOG  Import.......
 BUNDLE  e2e/mocks/server.js 

 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 LOG  Server.......
 LOG  Server listening.......
 LOG  MSW started.......
 LOG  Outgoing: GET https://reactnative.dev/movies.json
 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 BUNDLE  ./index.js 

 BUNDLE  e2e/msw.polyfills.js 

 LOG  LOADING.......
 LOG  Running "msw_test" with {"rootTag":41,"initialProps":{}}
 LOG  ......Starting APP.......
 LOG  Import.......
 BUNDLE  e2e/mocks/server.js 

 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
 LOG  Server.......
 LOG  Server listening.......
 LOG  MSW started.......
 LOG  Outgoing: GET https://reactnative.dev/movies.json
 LOG  ......Starting APP.......
 LOG  ......Starting APP.......
```

#### Detox console

```bash
$> detox test -l info --record-logs all -c ios.sim.debug starter.test.js  
15:34:44.091 detox[19310] B jest --config e2e/jest.config.js starter.test.js
15:34:47.616 detox[19311] i starter.test.js is assigned to 3D76136D-9D8C-4B90-85FC-F7ECE8775A66 (iPhone 15 Pro)
15:34:49.118 detox[19311] i org.reactjs.native.example.msw-test launched. To watch simulator logs, run:
        /usr/bin/xcrun simctl spawn 3D76136D-9D8C-4B90-85FC-F7ECE8775A66 log stream --level debug --style compact --predicate 'process == "msw_test"'
15:34:54.096 detox[19311] i Example: should have <v>ervers> button
15:34:55.411 detox[19311] i Example: should have <v>ervers> button [OK]
15:34:55.412 detox[19311] i Example: should have Intersteller last
15:34:56.673 detox[19311] i Example: should have Intersteller last [OK]
15:34:56.674 detox[19311] i Example: Ververs -> should have BTTF last
15:34:58.393 detox[19311] i Example: Ververs -> should have BTTF last [OK]
15:34:58.393 detox[19311] i Example: Ververs -> should have Mandolarion last => THIS ONE FAILS
15:35:00.114 detox[19311] i Example: Ververs -> should have Mandolarion last => THIS ONE FAILS [FAIL]

 FAIL  e2e/starter.test.js (15.732 s)
  Example
    ✓ should have <v>ervers> button (1259 ms)
    ✓ should have Intersteller last (1205 ms)
    ✓ Ververs -> should have BTTF last (1664 ms)
    ✕ Ververs -> should have Mandolarion last => THIS ONE FAILS (1665 ms)

  ● Example › Ververs -> should have Mandolarion last => THIS ONE FAILS

    expect(received).toContain(expected) // indexOf

    Expected substring: "Mandolarian, 2021"
    Received string:    "Interstellar, 2014"

      56 |     await expect(element(by.id('item-4'))).toBeVisible();
      57 |     const attributes0 = await element(by.id('item-4')).getAttributes();
    > 58 |     jestExpect(attributes0.text).toContain('Mandolarian, 2021');
         |                                  ^
      59 |   });
      60 | });
      61 |

      at Object.toContain (e2e/starter.test.js:58:34)
      at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
      at _next (node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:9)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        15.773 s
```