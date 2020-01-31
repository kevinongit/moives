export const movieListJSON = [
  {id:1, title: 'Die Hard', fresh: true, rating: '95%', gross: '$52,000 '},
  {id:2, title: 'Inception', fresh: false, rating: '92%', gross: '$12,000 '},
  {id:3, title: 'Pirate of Caribbean', fresh: false, rating: '85%', gross: '$32,000 '},
  {id:4, title: 'End Game', fresh: true, rating: '84%', gross: '$42,000 '},
  {id:5, title: 'Last Jedi', fresh: false, rating: '65%', gross: '$15,000 '},
  {id:6, title: 'Ghost Protocol', fresh: false, rating: '65%', gross: '$42,000 '},
  {id:7, title: 'Matrix', fresh: true, rating: '87%', gross: '$9,000 '},
];

export const movieDetailsJSON = {
  1: {
    title: 'Die Hard',
    rating: '95%',
    fresh: true,
    audience: '81%',
    consensus: 'Its many imitators (and sequels) have never come close to matching the taut thrills of the definitive holiday action classic.',
    poster: '/img/die_hard.jpg',
  },
  2: {
    title: 'Inception',
    rating: '92%',
    fresh: false,
    audience: '91%',
    consensus: 'Smart, innovative, and thrilling, Inception is that rare summer blockbuster that succeeds viscerally as well as intellectually.',
    poster: '/img/inception.jpg',
  },
  3: {
    title: 'Pirates of the Caribbean',
    rating: '92%',
    fresh: false,
    audience: '86%',
    consensus: 'May leave you exhausted like the theme park ride that inspired it; however, you\'ll have a good time when it\'s over.',
    poster: '/img/pirates_of_the_caribbean.jpg',
  },
  4: {
    title: 'Avengers: Endgame',
    rating: '92%',
    fresh: true,
    audience: '90%',
    consensus: 'Exciting, entertaining, and emotionally impactful, Avengers: Endgame does whatever it takes to deliver a satisfying finale to Marvel\'s epic Infinity Saga.',
    poster: '/img/endgame.jpg',
  },
  5: {
    title: 'Star Wars: The Last Jedi',
    rating: '92%',
    fresh: false,
    audience: '43%',
    consensus: 'The Last Jedi honors the saga\'s rich legacy while adding some surprising twists -- and delivering all the emotion-rich action fans could hope for.',
    poster: '/img/last_jedi.jpg',
  },
  6: {
    title: 'Mission Impossible',
    rating: '92%',
    fresh: false,
    audience: '76%',
    consensus: 'Stylish, fast-paced, and loaded with gripping set pieces, the fourth Mission: Impossible is big-budget popcorn entertainment that really works.',
    poster: '/img/ghost_protocol.jpg',
  },
  7: {
    title: 'The Matrix',
    rating: '92%',
    fresh: true,
    audience: '85%',
    consensus: 'Thanks to the Wachowskis\' imaginative vision, The Matrix is a smartly crafted combination of spectacular action and groundbreaking special effects.',
    poster: '/img/matrix.jpg',
  },
};

export const movieReviewsJSON = {
  1: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  2: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  3: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  4: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  5: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  6: [{"id":0,"fresh":true,"text":"review1"}, {"id":1,"fresh":true,"text":"review2"}, ],
  7: [
        {"id":0,"fresh":true,"text": "The Matrix still stands up as a fiercely exciting and discombobulating futurist drama"},
        {"id":1,"fresh":true,"text": "A technologically stunning movie that furthers the genre and features crowd-pleasing performances to go with the frequent scenes of gunplay and violence."},
     ],
};
