import {http, bypass, HttpResponse} from 'msw';

export const handlers = [
  http.all('http://localhost:8081/symbolicate', ({request}) => {
    bypass(request);
  }),

  http.get('https://reactnative.dev/movies.json', ({request}) => {
    //return HttpResponse.error();
    bypass(request);
  }),

  http.get('https://fake_reactnative.dev/movies.json', () => {
    return HttpResponse.json({
      title: 'The Basics - Networking',
      description: 'Your app fetched this from a TEST endpoint!',
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
