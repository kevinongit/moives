import React, { Suspense } from "react";
import ReactDOM from "react-dom"
import Spinner from "./Spinner";
import MovieListPage from "./movie/MovieListPage";
import MoviePage from './movie/MoviePage';
import './App.css';
import { toggleDirector } from './misc/toggleDirector'

const DEALY_MS = 1000;

const App = () => {
  const [currentId, setCurrentId] = React.useState(null);
  const deferredCurrentId = React.useDeferredValue(currentId, {
    timeoutMs: DEALY_MS,
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
  
  function renderList() {
    return (
      <>
        <MovieListPage
          onMovieClick={handleMovieClick}
          // loadingId={id}
        />
      </>
    );
  }

  const showDetail = deferredCurrentId !== null && currentId === deferredCurrentId;
  // console.log(`showdetail(${showDetail})`)
  return (
    <div className='App'>
      <Suspense
        fallback={<Spinner isBig/>}
      >
        { showDetail ?
          renderDetail(currentId) :
          renderList()
        }
      </Suspense>
    </div>
  );
};

function NextButton(props) {
  return (
    <div className="next" onClick={props.onClick}>
      <div className="next-inner">
        { props.isLoading ? <Spinner /> : '👉'}
      </div>
    </div>
  )
}

export default App;
