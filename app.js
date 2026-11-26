// ============================================================
// app.js — what your site DOES.
// Plain JavaScript, no libraries, no installs.
// It uses STARTUP and LISTINGS from data.js (loaded first).
// ============================================================

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. Saving things in the browser (localStorage).
  //    This only remembers things on THIS browser on THIS device.
  //    Your teammates and your customers will NOT see it.
  //    A real product would need a server and a database for that.
  // ----------------------------------------------------------
  const storage = {
    get: function (key, fallback) {
      try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
      } catch (error) {
        return fallback; // storage blocked or broken: just carry on
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // storage blocked (e.g. private window): ignore
      }
    }
  };

  let savedIds = storage.get("savedIds", []);

  // ----------------------------------------------------------
  // 2. Put the startup's name and pitch on the page.
  // ----------------------------------------------------------
  document.title = STARTUP.name;
  document.getElementById("brand-name").textContent = STARTUP.name;
  document.getElementById("tagline").textContent = STARTUP.tagline;
  document.getElementById("pitch").textContent = STARTUP.pitch;

  document.getElementById("featured-episode-label").textContent = FEATURED_EPISODE.label;
  document.getElementById("featured-episode-title").textContent = FEATURED_EPISODE.title;
  document.getElementById("featured-episode-description").textContent = FEATURED_EPISODE.description;

  const popularSketchGrid = document.getElementById("popular-sketch-grid");
  const fanRankingList = document.getElementById("fan-ranking-list");

  function makeSketchCard(sketch) {
    const card = document.createElement("article");
    card.className = "card sketch-card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "Fan pick #" + sketch.rank;

    const title = document.createElement("h3");
    title.textContent = sketch.title;

    const description = document.createElement("p");
    description.textContent = sketch.description;

    card.append(tag, title, description);
    return card;
  }

  function makeRankingItem(sketch) {
    const item = document.createElement("li");

    const rank = document.createElement("span");
    rank.className = "ranking-number";
    rank.textContent = "#" + sketch.rank;

    const title = document.createElement("span");
    title.textContent = sketch.title;

    item.append(rank, title);
    return item;
  }

  popularSketchGrid.replaceChildren.apply(popularSketchGrid, POPULAR_SKETCHES.map(makeSketchCard));
  fanRankingList.replaceChildren.apply(fanRankingList, POPULAR_SKETCHES.map(makeRankingItem));

  // ----------------------------------------------------------
  // 3. Views: show one section at a time, based on the #link in the address bar.
  // ----------------------------------------------------------
  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const views = document.querySelectorAll("[data-view]");
    const matchingView = Array.prototype.find.call(views, function (view) {
      return view.id === requested;
    });
    const home = document.getElementById("home");
    const sectionTarget = !matchingView && document.getElementById(requested);
    const homeSectionTarget = sectionTarget && home.contains(sectionTarget) ? sectionTarget : null;
    const current = matchingView ? requested : "home";

    views.forEach(function (view) {
      view.hidden = view.id !== current;
    });

    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (homeSectionTarget) {
      homeSectionTarget.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", showView);

  // ----------------------------------------------------------
  // 4. Explore page: build one card per listing.
  //    We use textContent (not innerHTML) so text is always shown
  //    as text — a basic security habit.
  // ----------------------------------------------------------
  const grid = document.getElementById("listing-grid");
  const searchBox = document.getElementById("search-box");
  const emptyMessage = document.getElementById("empty-message");
  const savedCount = document.getElementById("saved-count");

  function makeCard(item) {
    const card = document.createElement("article");
    card.className = "card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.category;

    const title = document.createElement("h2");
    title.textContent = item.name;

    const text = document.createElement("p");
    text.textContent = item.description;

    const isSaved = savedIds.indexOf(item.id) !== -1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary";
    button.textContent = isSaved ? "Saved ✓" : "Save";
    button.setAttribute("aria-pressed", isSaved ? "true" : "false");
    button.addEventListener("click", function () {
      toggleSaved(item.id);
    });

    card.append(tag, title, text, button);
    return card;
  }

  function toggleSaved(id) {
    if (savedIds.indexOf(id) === -1) {
      savedIds.push(id);
    } else {
      savedIds = savedIds.filter(function (savedId) { return savedId !== id; });
    }
    storage.set("savedIds", savedIds);
    renderListings();
  }

  function renderListings() {
    const query = searchBox.value.trim().toLowerCase();
    const matches = LISTINGS.filter(function (item) {
      const text = (item.name + " " + item.category + " " + item.description).toLowerCase();
      return text.indexOf(query) !== -1;
    });

    grid.replaceChildren.apply(grid, matches.map(makeCard));
    emptyMessage.hidden = matches.length > 0;
    savedCount.textContent = savedIds.length === 0
      ? "Tap Save on anything you like."
      : "You've saved " + savedIds.length + " item(s) on this device.";
  }

  searchBox.addEventListener("input", renderListings);

  // ----------------------------------------------------------
  // 5. Start up.
  // ----------------------------------------------------------
  renderListings();
  showView();
})();
