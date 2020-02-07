
import { movieListJSON, movieDetailsJSON, movieReviewsJSON } from './data';

export function fetchMovieList(props) {
    const interval = (props && props.interval) || 0;
    console.log('fetch movie list...');
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('fetched movie dettails.');
            resolve(movieListJSON)
        }, interval);
    });
}

export function fetchMovieDetails(props) {
    const interval = (props && props.interval) || 0;
    console.log('fetch movie details...');
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('fetched movie dettails.');
            resolve(movieDetailsJSON[props.id])
        }, interval);
    });
}

export function fetchMovieReviews(props) {
    const interval = (props && props.interval) || 0;
    console.log('fetch movie reviews...');
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('fetched movie reviews.');
            resolve(movieReviewsJSON[props.id])
        }, interval);
    });
}

/// code from : https://codesandbox.io/s/frosty-hermann-bztrp
// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      r => {
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }