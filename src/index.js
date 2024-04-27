import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Rated from "./pages/Rated";
import Movie from "./pages/Movie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const trendings = await (await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          const discovers = await (await fetch('https://api.themoviedb.org/3/discover/movie?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          if (trendings.results.length > 0) {
            caches.open('trendings').then(cache => cache.put('trendings', new Response(JSON.stringify(trendings))));
          }
          if (discovers.results.length > 0) {
            caches.open('discovers').then(cache => cache.put('discovers', new Response(JSON.stringify(discovers))));
          }
          return { trendings, discovers };
        }
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'rated',
        element: <Rated />
        
      },
      {
        path: 'movie/:id',
        element: <Movie />,
        loader: async ({ params }) => {
          const movieId = params.id;
          const movie = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const keywords = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const similars = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const videos = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const watchProviders = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const credits = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const recommendations = await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();

          if (movie) {
            caches.open('movies').then(cache => {
              cache.put(`movie-${movieId}`, new Response(JSON.stringify(movie)));
              cache.put(`keywords-${movieId}`, new Response(JSON.stringify(keywords)));
              cache.put(`similars-${movieId}`, new Response(JSON.stringify(similars)));
              cache.put(`videos-${movieId}`, new Response(JSON.stringify(videos)));
              cache.put(`watchProviders-${movieId}`, new Response(JSON.stringify(watchProviders)));
              cache.put(`credits-${movieId}`, new Response(JSON.stringify(credits)));
              cache.put(`recommendations-${movieId}`, new Response(JSON.stringify(recommendations)));
            });
          }
          return { movie, keywords: keywords.keywords, similars: similars.results, videos: videos.results, watchProviders: Object.entries(watchProviders.results), credits: credits.cast, recommendations: recommendations.results };
        }
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
