import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Rated from './pages/Rated';
import Search from './pages/Search';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchTMDBData = async (endpoint) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const trendings = await (
            await fetch(
              `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
            )
          ).json();
          const discovers = await (
            await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
            )
          ).json();
          if (trendings.results.length > 0) {
            caches
              .open('trendings')
              .then((cache) =>
                cache.put('trendings', new Response(JSON.stringify(trendings)))
              );
          }
          if (discovers.results.length > 0) {
            caches
              .open('discovers')
              .then((cache) =>
                cache.put('discovers', new Response(JSON.stringify(discovers)))
              );
          }
          return { trendings, discovers };
        },
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'rated',
        element: <Rated />,
      },
      {
        path: 'movie/:id',
        element: <Movie />,
        loader: async ({ params }) => {
          const movieId = params.id;

          const [
            movie,
            keywords,
            similars,
            videos,
            watchProviders,
            credits,
            recommendations,
          ] = await Promise.all([
            fetchTMDBData(`/movie/${movieId}`),
            fetchTMDBData(`/movie/${movieId}/keywords`),
            fetchTMDBData(`/movie/${movieId}/similar`),
            fetchTMDBData(`/movie/${movieId}/videos`),
            fetchTMDBData(`/movie/${movieId}/watch/providers`),
            fetchTMDBData(`/movie/${movieId}/credits`),
            fetchTMDBData(`/movie/${movieId}/recommendations`),
          ]);

          if (movie) {
            caches.open('movies').then((cache) => {
              cache.put(
                `movie-${movieId}`,
                new Response(JSON.stringify(movie))
              );
              cache.put(
                `keywords-${movieId}`,
                new Response(JSON.stringify(keywords))
              );
              cache.put(
                `similars-${movieId}`,
                new Response(JSON.stringify(similars))
              );
              cache.put(
                `videos-${movieId}`,
                new Response(JSON.stringify(videos))
              );
              cache.put(
                `watchProviders-${movieId}`,
                new Response(JSON.stringify(watchProviders))
              );
              cache.put(
                `credits-${movieId}`,
                new Response(JSON.stringify(credits))
              );
              cache.put(
                `recommendations-${movieId}`,
                new Response(JSON.stringify(recommendations))
              );
            });
          }
          return {
            movie,
            keywords: keywords.keywords,
            similars: similars.results,
            videos: videos.results,
            watchProviders: Object.entries(watchProviders.results),
            credits: credits.cast,
            recommendations: recommendations.results,
          };
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

const cacheData = (cacheName, key, data) => {
  caches.open(cacheName).then((cache) => {
    cache.put(key, new Response(JSON.stringify(data)));
  });
};
