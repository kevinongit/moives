import React from 'react';
import Spinner from '../Spinner'
import { movieListJSON as movies } from '../api/data';


export default function MovieListPage({ loadingId, onMovieClick, toggleTool }) {
  console.log(`loadingId(${loadingId})`)
  return (
    <div>
      <h1> Top Box <a  onClick={toggleTool}>🐞</a>ffice {/*<a className="Bug" onClick={toggleTool}>{' 🐞'}</a> */}🍿 </h1>

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
