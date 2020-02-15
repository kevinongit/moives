import React, { Suspense, Placeholder } from "react";
import ReactDOM from "react-dom"
import Spinner from "./Spinner";
import MovieListPage from "./movie/MovieListPage";
import MoviePage from './movie/MoviePage';
import './App.css';
import { toggleDirector } from './misc/toggleDirector'


const App = () => {
  const [currentId, setCurrentId] = React.useState(null);
  const deferredCurrentId = React.useDeferredValue(currentId, {
    timeoutMs: 3000,
  });

  const handleMovieClick = id => {
    setCurrentId(id);
  };

  const handleBackClick = () => {
    setCurrentId(null);
  };

  toggleDirector();

  function renderDetail(id) {
    return (
      <>
        <button
          className='App-back'
          onClick={handleBackClick}>
            {'👈'}
          </button>
          <MoviePage id={id} />
          
      </>
    )
  }
  
  function renderList(id) {
    return (
      <>
        <MovieListPage
          onMovieClick={handleMovieClick}
          // loadingId={2}
          loadingId={id}
        />
      </>
    );
  }

  const showDetail = deferredCurrentId !== null && currentId === deferredCurrentId;

  return (
    <div className='App'>
      <Suspense
        fallback={<Spinner />}
      >
        { showDetail ?
          renderDetail(currentId) :
          renderList(currentId)
        }
      </Suspense>
      
    </div>
  );
};

export default App;
