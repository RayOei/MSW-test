import {server} from './mocks/server.js';
import {http, HttpResponse} from 'msw';

const jestExpect = require('expect').default;
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    server.resetHandlers();
  });

  afterAll(async () => {
    server.close();
  });

  it('should have <Refresh> button', async () => {
    await expect(element(by.id('ververs'))).toBeVisible();
  });

  it('should have <Reset> button', async () => {
    await expect(element(by.id('reset'))).toBeVisible();
  });

  it('should have <Clear> button', async () => {
    await expect(element(by.id('clear'))).toBeVisible();
  });

  it('should have Intersteller last', async () => {
    await expect(element(by.id('item-5'))).toBeVisible();
    const attributes0 = await element(by.id('item-5')).getAttributes();
    jestExpect(attributes0.text).toContain('Interstellar, 2014');
  });

  it('Refresh -> should have BTTF last', async () => {
    await element(by.id('ververs')).tap();
    await expect(element(by.id('item-5'))).toBeVisible();
    const attributes0 = await element(by.id('item-5')).getAttributes();
    jestExpect(attributes0.text).toContain('Back to the Future, 1985');
  });

  it('CLEAR -> only unknown entries', async () => {
    await element(by.id('clear')).tap();
    await expect(element(by.id('item-4'))).toBeVisible();
    const attributes0 = await element(by.id('item-4')).getAttributes();
    jestExpect(attributes0.text).toContain('Onbekend');
  });

  // Following instructions from https://mswjs.io/docs/best-practices/structuring-handlers
  it('Refresh -> should have Mandolarion last => THIS ONE FAILS', async () => {
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
    );
    console.log(server.listHandlers());
    // It looks like this server.use is not seen??
    server.use(
      http.get('https://fake_reactnative.dev/movies.json', () => {
        return HttpResponse.json({
          title: 'Handler response',
          description: 'App fetched this from a intermediate MSW endpoint!',
          movies: [
            {id: '1', title: 'Inception', releaseYear: '2010'},
            {id: '2', title: 'Star Wars', releaseYear: '1977'},
            {id: '3', title: 'Interstellar', releaseYear: '2014'},
            {id: '4', title: 'Mandolarion', releaseYear: '2021'},
          ],
        });
      }),
    );
    console.log(
      '-------------------------------------------------------------',
    );
    console.log(server.listHandlers());
    console.log(
      '=============================================================',
    );
    await element(by.id('ververs')).tap();
    await expect(element(by.id('item-4'))).toBeVisible();
    const attributes0 = await element(by.id('item-4')).getAttributes();
    jestExpect(attributes0.text).toContain('Mandolarian, 2021');
  });
});
