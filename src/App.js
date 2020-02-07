import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieListPage from './movie/MovieListPage';
import MoviePage from './movie/MoviePage';

import Spinner from './misc/Spinner'

export default class App extends PureComponent {
  state = {
    currentId: null,
    showDetail: false,

    // enteredId: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showDetail !== this.state.showDetail ||
      prevState.currentId !== this.state.currentId
    ) {
      window.scrollTo(0,0);
    }
  }

  handleMovieClick = (id) => {
    this.setState({
      currentId: id,
      showDetail: true,
    });
    
  }
  handleBackClick = () => {
    this.setState({
      currentId: null,
      showDetail: false,
    })
  }

  

  render() {
    const { currentId, showDetail } = this.state;
    return (
      <div className='App'>
        { showDetail ?
          this.renderDetail(currentId) :
          this.renderList()
        }
      </div>
    );
  }

  renderDetail(id) {
    return (
      <>
        <button
          className='App-back'
          onClick={this.handleBackClick}>
            {'👈'}
          </button>
          <MoviePage id={id} />
      </>
    )

  }

  renderList() {
    return (
      <MovieListPage
        onMovieClick={this.handleMovieClick}

        isLoading={false}
      />
    );
  }
}

function NextButton(props) {
  return (
    <div className="next" onClick={props.onClick}>
      <div className="next-inner">
        { props.isLoading ? <Spinner /> : '👉'}
      </div>
    </div>
  )
}
