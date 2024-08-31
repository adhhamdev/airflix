import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import ErrorPage from './pages/ErrorPage';
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            const [trendings, discovers] = await Promise.all([
              fetchTMDBData('/trending/movie/day'),
              fetchTMDBData('/discover/movie'),
            ]);
            return { trendings, discovers };
          } catch (error) {
            throw new Response('Error loading home data', { status: 500 });
          }
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
          try {
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
            return {
              movie,
              keywords: keywords.keywords,
              similars: similars.results,
              videos: videos.results,
              watchProviders: Object.entries(watchProviders.results),
              credits: credits.cast,
              recommendations: recommendations.results,
            };
          } catch (error) {
            throw new Response('Error loading movie data', { status: 500 });
          }
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
