import React, { Suspense, Placeholder } from "react";
import ReactDOM from "react-dom"
import Spinner from "./misc/Spinner";
import MovieListPage from "./movie/MovieListPage";
import MoviePage from './movie/MoviePage';
import './App.css';

const toggleTool = () => {
  const directorId = "hitchcock-director";
  const director = document.getElementById(directorId);
  if (director) {
    if (director.style.display === "block") {
      director.style.display = "none";
    } else {
      director.style.display = "block";
    }
  }

}

const App = () => {
  const [currentId, setCurrentId] = React.useState(null);
  const deferredCurrentId = React.useDeferredValue(currentId, {
    timeoutMs: 1000,
  });

  const handleMovieClick = id => {
    setCurrentId(id);
  };

  const handleBackClick = () => {
    setCurrentId(null);
  };

  toggleTool();

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
        {/* <button
          className='App-back'
          onClick={toggleTool}>
            {'🐞'}
          </button> */}
        <MovieListPage
          onMovieClick={handleMovieClick}
          toggleTool={toggleTool}
          // loadingId={currentId}
        />
      </>
    );
  }

  const showDetail =
    deferredCurrentId !== null && currentId === deferredCurrentId;
// console.log(`showDetail(${showDetail}), currentId(${currentId}), deferredCurrentId(${deferredCurrentId})`)
  // return (
  //   <React.Suspense 
  //     // maxDuration={1500}
      
  //     fallback={<Spinner isBig />}
  //   >
  //     {!showDetail ? (
  //       <MovieListPage onMovieClick={handleMovieClick} />
  //     ) : (
  //       <div>
  //         <button className="onBack" onClick={handleBackClick}>
  //           {"👈"}
  //         </button>
  //         <MoviePage id={deferredCurrentId} />
  //       </div>
  //     )}
  //   </React.Suspense>
  // );
  return (
    <div className='App'>
      <Suspense
        // maxDuration={1500}
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



export default App;
