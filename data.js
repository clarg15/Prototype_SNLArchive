// ============================================================
// data.js — ALL the fake data for your prototype lives here.
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
  tagline: "The fan-powered home for everything Saturday Night Live.",
  pitch: "SNL fans can discuss and rate sketches, rank their favorites, and find show facts in one shared archive instead of piecing it together across the web."
};

const LISTINGS = [
  { id: 1, name: "Sketch discussions", category: "Community", description: "Share reactions and join conversations about memorable SNL sketches." },
  { id: 2, name: "Sketch ratings", category: "Reviews", description: "Rate sketches and see what other fans think." },
  { id: 3, name: "Fan rankings", category: "Rankings", description: "Build and explore rankings of favorite sketches, episodes, and eras." },
  { id: 4, name: "Cast and hosts", category: "Show facts", description: "Find information about the performers and guest hosts behind the show." },
  { id: 5, name: "Episode archive", category: "Show facts", description: "Explore episodes and look up details from across SNL's history." },
  { id: 6, name: "Musical guests", category: "Show facts", description: "Discover the artists who have performed on Saturday Night Live." }
];
