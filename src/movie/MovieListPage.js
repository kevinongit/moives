import React from 'react';
import Spinner from '../misc/Spinner'
import { movieListJSON as movies } from '../api/data';


export default function MovieListPage({ loadingId, onMovieClick }) {
  return (
    <div>
      <h1>Top Box Office 🍿 </h1>

      <div >
        {
          movies.map(movie => (
            <div
              key={movie.id}
              className="movie"
              onClick={() => onMovieClick(movie.id)}
            >
              <div className="rating"> {movie.fresh ? '🍅' : ' 🤢'} </div>
              <div className="main">
                <div className="title">{movie.title}</div>
                <div className="info">
                  {movie.rating} · {movie.gross}
                </div>
              </div>
              {loadingId !== movie.id && <div className="hover">{'👉'}</div>}
              {loadingId === movie.id && (
                <div className="loading">
                  <Spinner />
                </div>
              )}

            </div>
          ))
        }
      </div>
    </div>
  )
};
