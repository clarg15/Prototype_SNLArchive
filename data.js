// ============================================================
// data.js — Sample and fictional content for your prototype.
// Historical episode dates, hosts, and musical guests live in episodes.js.
//
// There is no database. Everything below is made up, and that is
// on purpose: never put real people's names, emails, phone numbers
// or addresses in this file.
//
// To change what appears on the Explore page, edit LISTINGS.
// Each item is one card. Keep the same fields (id, name, category,
// description) or ask Copilot to add new ones everywhere they're needed.
// ============================================================

const STARTUP = {
  name: "SNL Archive",
  tagline: "Rewind. Laugh. Rank",
  pitch: "Your seat in the fandom—revisit classic sketches, explore every episode, and keep the late-night conversation going."
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
    title: "Best sketches of all time",
    link: "#popular-sketches",
    linkText: "View popular sketches",
    entries: ["More Cowbell", "Celebrity Jeopardy", "Debbie Downer"]
  },
  {
    title: "Cast members",
    link: "#cast",
    linkText: "Explore cast & writers",
    entries: ["Kate McKinnon", "Will Ferrell", "Bill Murray"]
  },
  {
    title: "Hosts",
    link: "#episodes",
    linkText: "Explore episodes",
    entries: ["Steve Martin", "Alec Baldwin", "John Goodman"]
  },
  {
    title: "Musical Guests",
    link: "#episodes",
    linkText: "Search musical guests",
    entries: ["Prince", "David Bowie", "Beyonce"]
  },
  {
    title: "Weekend Update anchors",
    link: "#cast",
    linkText: "Explore the archive",
    entries: ["Norm Macdonald", "Colin Jost", "Seth Meyers"]
  }
];

const LISTINGS = [
  { id: 1, name: "Sketch discussions", category: "Community", description: "Share reactions and join conversations about memorable SNL sketches." },
  { id: 2, name: "Sketch ratings", category: "Reviews", description: "Rate sketches and see what other fans think." },
  { id: 3, name: "Fan rankings", category: "Rankings", description: "Build and explore rankings of favorite sketches, episodes, and eras." },
  { id: 4, name: "Cast and hosts", category: "Show facts", description: "Find information about the performers and guest hosts behind the show." },
  { id: 5, name: "Episode archive", category: "Show facts", description: "Explore episodes and look up details from across SNL's history." },
  { id: 6, name: "Musical guests", category: "Show facts", description: "Discover the artists who have performed on Saturday Night Live." }
];
