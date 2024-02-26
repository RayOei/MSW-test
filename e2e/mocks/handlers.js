import {http, bypass, HttpResponse, passthrough} from 'msw';

export const handlers = [
  http.all('http://localhost:8081/symbolicate', ({request}) => {
    bypass(request);
  }),

  // Expected to be returned once - but it isn't
  http.get('https://reactnative.dev/movies.json', () => {
    return new HttpResponse('Only returned once', {
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
        {id: '1', title: 'Inception', releaseYear: '2010'},
        {id: '2', title: 'Star Wars', releaseYear: '1977'},
        {id: '3', title: 'The Matrix', releaseYear: '1999'},
        {id: '4', title: 'Interstellar', releaseYear: '2014'},
        {id: '5', title: 'Back to the Future', releaseYear: '1985'},
      ],
    });
  }),
];
