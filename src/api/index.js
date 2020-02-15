
import { movieListJSON, movieDetailsJSON, movieReviewsJSON } from './data';

const INTERVAL = 0;

const delay = (duration) => new Promise((resolve) => setTimeout(resolve,duration));

export async function fetchMovieDetails(id) {
  // await delay(INTERVAL);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(movieDetailsJSON[id]);
    }, INTERVAL)
    
  });
}

// export async function fetchMovieReviews(id) {
//   await delay(1000);
//   return new Promise(resolve => {
//     resolve(movieReviewsJSON[id]);
//   });
// }

export function fetchMovieReviews(id) {
  console.log('fetch movie reviews...');
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('fetched movie reviews.');
          resolve(movieReviewsJSON[id])
      }, INTERVAL);
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
