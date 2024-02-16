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

  it('should have <v>ervers> button', async () => {
    await expect(element(by.id('ververs'))).toBeVisible();
  });

  it('should have Intersteller last', async () => {
    await expect(element(by.id('item-5'))).toBeVisible();
    const attributes0 = await element(by.id('item-5')).getAttributes();
    jestExpect(attributes0.text).toContain('Interstellar, 2014');
  });

  it('Ververs -> should have BTTF last', async () => {
    await element(by.id('ververs')).tap();
    await expect(element(by.id('item-5'))).toBeVisible();
    const attributes0 = await element(by.id('item-5')).getAttributes();
    jestExpect(attributes0.text).toContain('Back to the Future, 1985');
  });

  it('Ververs -> should have Mandolarion last => THIS ONE FAILS', async () => {
    // It looks like this server.use is not seen??
    server.use(
      http.get('https://reactnative.dev/movies.json', () => {
        return HttpResponse.json({
          title: 'The Basics - Networking',
          description: 'Your app fetched this from a TEST endpoint!',
          movies: [
            {id: '1', title: 'Inception', releaseYear: '2010'},
            {id: '2', title: 'Star Wars', releaseYear: '1977'},
            {id: '3', title: 'Interstellar', releaseYear: '2014'},
            {id: '4', title: 'Mandolarion', releaseYear: '2021'},
          ],
        });
      }),
    );
    await element(by.id('ververs')).tap();
    await expect(element(by.id('item-4'))).toBeVisible();
    const attributes0 = await element(by.id('item-4')).getAttributes();
    jestExpect(attributes0.text).toContain('Mandolarian, 2021');
  });
});
