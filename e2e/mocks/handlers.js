import {http, bypass, HttpResponse, passthrough} from 'msw';

export const handlers = [
  http.all('http://localhost:8081/symbolicate', ({request}) => {
    bypass(request);
  }),

  // Expected to be returned once - but it isn't
  http.get('https://reactnative.dev/movies.json', () => {
    return new HttpResponse('Should be returned once, only', {
      status: 404,
      once: true,
    });
  }),

  // Expected to be returned after the "404 once" but never returned
  http.get('https://reactnative.dev/movies.json', ({request}) => {
    // With error the error response should be shown
    //return HttpResponse.error();

    return HttpResponse.json({
      title: 'Handler response',
      description: 'App fetched this from a MSW endpoint!',
      movies: [
        {id: '1', title: 'Some other', releaseYear: '1999'},
        {id: '2', title: 'And another Wars', releaseYear: '1947'},
        {id: '3', title: 'More for the Matrix', releaseYear: '1899'},
        {id: '4', title: 'Inter somewhere in stellar', releaseYear: '2024'},
        {id: '5', title: 'And as last again', releaseYear: '1975'},
      ],
    });
  }),

  // Expected to be returned from the start as the main handler for this call => but it isn't
  http.get('https://fake_reactnative.dev/movies.json', () => {
    return HttpResponse.json({
      title: 'Handler response',
      description: 'App fetched this from a MSW endpoint!',
      movies: [
        {id: '1', title: 'Movie_fake_1', releaseYear: '2010'},
        {id: '2', title: 'Movie_fake_2', releaseYear: '1977'},
        {id: '3', title: 'Movie_fake_3', releaseYear: '1999'},
        {id: '4', title: 'Movie_fake_4', releaseYear: '2014'},
        {id: '5', title: 'Movie_fake_5', releaseYear: '1985'},
      ],
    });
  }),
];
