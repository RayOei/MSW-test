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

  it('should have <getMovies> button', async () => {
    await expect(element(by.id('getMovies'))).toBeVisible();
  });

  it('should have <getFakeMovies> button', async () => {
    await expect(element(by.id('getFakeMovies'))).toBeVisible();
  });

  it('should have <Clear> button', async () => {
    await expect(element(by.id('clear'))).toBeVisible();
  });

  it('getMovies should return 404', async () => {
    await element(by.id('getMovies')).tap();
    await expect(element(by.id('item-1'))).toBeVisible();
    const attributes0 = await element(by.id('item-1')).getAttributes();
    jestExpect(attributes0.text).toContain('Only returned once, 404');
  });

  it('2nd getMovies should return `last again` => THIS ONE FAILS', async () => {
    await element(by.id('getMovies')).tap();
    await expect(element(by.id('item-1'))).toBeVisible();
    const attributes0 = await element(by.id('item-1')).getAttributes();
    jestExpect(attributes0.text).toContain('Some other, 1999');
  });

  it('GetFakeMovies should have Movie_fake_5 last', async () => {
    await element(by.id('getFakeMovies')).tap();
    await expect(element(by.id('item-5'))).toBeVisible();
    const attributes0 = await element(by.id('item-5')).getAttributes();
    jestExpect(attributes0.text).toContain('Movie_fake_5, 1985');
  });

  it('CLEAR should only have `unknown` entries', async () => {
    await element(by.id('clear')).tap();
    await expect(element(by.id('item-4'))).toBeVisible();
    const attributes0 = await element(by.id('item-4')).getAttributes();
    jestExpect(attributes0.text).toContain('Endpoint');
  });

  // Following instructions from https://mswjs.io/docs/best-practices/structuring-handlers
  it('Refresh -> should have Use_Movie_fake_4 last => THIS ONE FAILS', async () => {
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
    );
    console.log(server.listHandlers());
    //server.resetHandler(
    // It looks like this server.use is not seen??
    server.use(
      http.get('https://fake_reactnative.dev/movies.json', () => {
        return HttpResponse.json({
          title: 'Handler response',
          description: 'App fetched this from a intermediate MSW endpoint!',
          movies: [
            {id: '1', title: 'Use_Movie_fake_1', releaseYear: '2010'},
            {id: '2', title: 'Use_Movie_fake_2', releaseYear: '1977'},
            {id: '3', title: 'Use_Movie_fake_3', releaseYear: '2014'},
            {id: '4', title: 'Use_Movie_fake_4', releaseYear: '2021'},
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
    await element(by.id('getFakeMovies')).tap();
    await expect(element(by.id('item-4'))).toBeVisible();
    const attributes0 = await element(by.id('item-4')).getAttributes();
    jestExpect(attributes0.text).toContain('Use_Movie_fake_4, 2021');
  });
});
