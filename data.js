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
  tagline: "SNL Archive: The ultimate library of laughs.",
  pitch: "Welcome to SNL Archive, a fan-made place to discover episode spotlights, revisit sketches, and explore sample fan rankings."
};

const FEATURED_EPISODE = {
  label: "Fictional prototype spotlight",
  title: "The Midnight Matinee",
  description: "A neighborhood theater's last screening turns into an unexpected live show when the audience keeps calling for one more encore."
};

const POPULAR_SKETCHES = [
  {
    rank: 1,
    title: "The 2 A.M. Bodega",
    description: "A night-shift shopkeeper tries to keep up with increasingly unusual customers."
  },
  {
    rank: 2,
    title: "Subway Small Talk",
    description: "Two strangers' polite conversation takes a wild turn before the next stop."
  },
  {
    rank: 3,
    title: "The Last Train Home",
    description: "A group of commuters make a bold plan when the train is delayed again."
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
