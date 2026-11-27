// ============================================================
// data.js — Homepage and sample fan-ranking content for the prototype.
// Historical episode dates, hosts, and musical guests live in episodes.js.
//
// There is no database. Ranking votes are illustrative demo data. Never
// put personal contact information or private user content in this file.
//
// RANKING_CATEGORIES contains sample rankings. Vote totals are demo data.
// ============================================================

const STARTUP = {
  name: "SNL Archive",
  tagline: "The ultimate library of laughs.",
  pitch: "Your seat to keep the late-night conversation going."
};

const FEATURED_EPISODE = {
  label: "Season 52, Episode 7",
  title: "Amanda Seyfried",
  description: "December 5, 2026 · Live from Studio 8H."
};

const POPULAR_SKETCHES = [
  {
    rank: 1,
    title: "More Cowbell",
    description: "Will Ferrell and Christopher Walken star in a fictionalized studio session for Blue Öyster Cult's 'Don't Fear the Reaper'."
  },
  {
    rank: 2,
    title: "Matt Foley: Down by the River",
    description: "Chris Farley plays an intense motivational speaker warning two teens about living in a van down by the river."
  },
  {
    rank: 3,
    title: "Celebrity Jeopardy!",
    description: "Norm Macdonald's deadpan Burt Reynolds clashes with Will Ferrell's Alex Trebek and chaotic celebrity contestants."
  }
];

const RANKING_CATEGORIES = [
  {
    id: "cast-members",
    title: "Cast members",
    entries: [
      { name: "Kate McKinnon", votes: 42 },
      { name: "Will Ferrell", votes: 37 },
      { name: "Bill Murray", votes: 31 }
    ]
  },
  {
    id: "hosts",
    title: "Hosts",
    entries: [
      { name: "Steve Martin", votes: 40 },
      { name: "Alec Baldwin", votes: 33 },
      { name: "John Goodman", votes: 27 }
    ]
  },
  {
    id: "musical-guests",
    title: "Musical guests",
    entries: [
      { name: "Prince", votes: 46 },
      { name: "David Bowie", votes: 39 },
      { name: "Beyonce", votes: 32 }
    ]
  },
  {
    id: "sketches",
    title: "Sketches",
    entries: [
      { name: "More Cowbell", votes: 54 },
      { name: "Celebrity Jeopardy!", votes: 49 },
      { name: "Debbie Downer", votes: 34 }
    ]
  },
  {
    id: "episodes",
    title: "Episodes",
    entries: [
      { name: "George Carlin — October 11, 1975", votes: 36 },
      { name: "Betty White — May 8, 2010", votes: 31 },
      { name: "Steve Martin — October 23, 1976", votes: 28 }
    ]
  },
  {
    id: "seasons",
    title: "Seasons",
    entries: [
      { name: "Season 10 (1984–85)", votes: 37 },
      { name: "Season 1 (1975–76)", votes: 33 },
      { name: "Season 39 (2013–14)", votes: 28 }
    ]
  }
];
