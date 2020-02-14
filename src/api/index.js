
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

let cache = { };

function cacheFind(id, category) {
  return (cache && id && cache[id] && cache[id][category]) || null;
}

function cacheAdd(id, category, item) {
  if (!id || !category || !item) {
    console.log(' id, category and item should be presented!!')
    return
  }
  if (!cache[id]) {
    cache[id] = {}
  }
  cache[id][category] = item;
}

function cacheRemove(id=null, category=null) {

  if (id && category) {
    if (cache && cache[id] && cache[id][category]) {
      delete cache[id][category]
      console.log(`cacheRemove: id(${id}),category(${category})`)
    }
  } else if (id) {
    if (cache && cache[id]) {
      delete cache[id];
      console.log(`cacheRemove: id(${id}),category(${category})`)
    }
  } else {
    cache = {}
    console.log("cache cleared!!!")
  }
}

const delay = (duration) => new Promise((resolve) => setTimeout(resolve,duration));

export async function fetchMovieDetails(id) {
  await delay(1000);
  return new Promise(resolve => {
    resolve(movieDetailsJSON[id]);
  });
}

// export async function fetchMovieReviews(id) {
//   await delay(1000);
//   return new Promise(resolve => {
//     resolve(movieReviewsJSON[id]);
//   });
// }

export function fetchMovieReviews(id) {
  const interval =  1000;
  console.log('fetch movie reviews...');
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('fetched movie reviews.');
          resolve(movieReviewsJSON[id])
      }, interval);
  });
}



export function fetchMovieDetails2(props) {
  let found = cacheFind(props.id, "details");
  console.log("fetchMovieDetails props ", props)
  if (!found) {
    // found = fetchMovieDetailsImpl(props);
    found = fetchMovieDetailsImpl(props);
  }

  console.log("found = ", found)

  // return found;
  return found ? new Promise(resolve => resolve(found)) : fetchMovieDetailsImpl(props);
}


function fetchMovieDetailsImpl(props) {
  const CATEGORY = "details";
  const interval = (props && props.interval) || 0;
  console.log('fetch movie detailsImpl...', props);
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('fetched movie dettails.');
          const item = movieDetailsJSON[props.id];
          cacheAdd(props.id, CATEGORY, item);
          resolve(item)
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
