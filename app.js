// ============================================================
// app.js — what your site DOES.
// Plain JavaScript, no libraries, no installs.
// It uses sample content from data.js, episode listings from episodes.js, and people records from people.js.
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

  const seasonGrid = document.getElementById("season-grid");
  const seasonTitle = document.getElementById("season-title");
  const seasonEpisodeCount = document.getElementById("season-episode-count");
  const seasonEpisodeList = document.getElementById("season-episode-list");
  const episodeTitle = document.getElementById("episode-title");
  const episodeSeasonLabel = document.getElementById("episode-season-label");
  const episodeDate = document.getElementById("episode-date");
  const episodeHost = document.getElementById("episode-host");
  const episodeMusicGuest = document.getElementById("episode-music-guest");
  const episodeBackLink = document.getElementById("episode-back-link");
  const episodeDatabaseBody = document.getElementById("episode-database-body");
  const episodeSearchBox = document.getElementById("episode-search-box");
  const episodeSeasonFilter = document.getElementById("episode-season-filter");
  const episodeDateFrom = document.getElementById("episode-date-from");
  const episodeDateTo = document.getElementById("episode-date-to");
  const episodeResultCount = document.getElementById("episode-result-count");
  const episodeEmptyMessage = document.getElementById("episode-empty-message");
  const allEpisodes = [];

  Object.keys(SEASON_EPISODES).forEach(function (season) {
    SEASON_EPISODES[season].forEach(function (episode) {
      allEpisodes.push({
        season: Number(season),
        number: episode.number,
        date: episode.date,
        host: episode.host,
        musicalGuest: episode.musicalGuest
      });
    });
  });

  allEpisodes.sort(function (first, second) {
    return first.season - second.season || first.number - second.number;
  });

  function formatEpisodeDate(date) {
    const parts = date.split("-").map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  }

  for (let seasonNumber = 1; seasonNumber <= 52; seasonNumber += 1) {
    const link = document.createElement("a");
    link.className = "season-button";
    link.href = "#season-" + seasonNumber;
    link.textContent = "Season " + seasonNumber;
    seasonGrid.append(link);
  }

  function renderSeasonPage(seasonNumber) {
    const episodes = SEASON_EPISODES[String(seasonNumber)] || [];
    seasonTitle.textContent = "Season " + seasonNumber;
    seasonEpisodeCount.textContent = episodes.length + " aired episode" + (episodes.length === 1 ? "" : "s");

    const episodeLinks = episodes.map(function (episode) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.className = "episode-link";
      link.href = "#season-" + seasonNumber + "-episode-" + episode.number;
      link.textContent = "Episode " + episode.number + " — " + formatEpisodeDate(episode.date) +
        " — " + episode.host + " · " + (episode.musicalGuest || "Musical guest not listed");
      item.append(link);
      return item;
    });

    if (episodeLinks.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "No aired episodes are listed for this season yet.";
      episodeLinks.push(empty);
    }

    seasonEpisodeList.replaceChildren.apply(seasonEpisodeList, episodeLinks);
    document.title = "Season " + seasonNumber + " | " + STARTUP.name;
  }

  function findEpisode(seasonNumber, episodeNumber) {
    const episodes = SEASON_EPISODES[String(seasonNumber)] || [];
    return episodes.find(function (episode) {
      return episode.number === episodeNumber;
    });
  }

  function renderEpisodePage(seasonNumber, episode) {
    const formattedDate = formatEpisodeDate(episode.date);
    episodeTitle.textContent = formattedDate + " — " + episode.host;
    episodeSeasonLabel.textContent = "Season " + seasonNumber + " · Episode " + episode.number;
    episodeDate.textContent = formattedDate;
    episodeHost.textContent = episode.host;
    episodeMusicGuest.textContent = episode.musicalGuest || "Not listed";
    episodeBackLink.href = "#season-" + seasonNumber;
    episodeBackLink.textContent = "← Back to Season " + seasonNumber;
    document.title = formattedDate + " — " + episode.host + " | " + STARTUP.name;
  }

  function makeEpisodeRow(episode) {
    const row = document.createElement("tr");
    const seasonCell = document.createElement("td");
    const seasonLink = document.createElement("a");
    seasonLink.href = "#season-" + episode.season;
    seasonLink.textContent = String(episode.season);
    seasonCell.append(seasonLink);

    const numberCell = document.createElement("td");
    const episodeLink = document.createElement("a");
    episodeLink.href = "#season-" + episode.season + "-episode-" + episode.number;
    episodeLink.textContent = String(episode.number);
    numberCell.append(episodeLink);

    const hostCell = document.createElement("td");
    hostCell.textContent = episode.host;

    const musicGuestCell = document.createElement("td");
    musicGuestCell.textContent = episode.musicalGuest || "Not listed";

    const dateCell = document.createElement("td");
    const date = document.createElement("time");
    date.setAttribute("datetime", episode.date);
    date.textContent = formatEpisodeDate(episode.date);
    dateCell.append(date);

    row.append(seasonCell, numberCell, hostCell, musicGuestCell, dateCell);
    return row;
  }

  function renderEpisodeDatabase() {
    const query = episodeSearchBox.value.trim().toLowerCase();
    const selectedSeason = episodeSeasonFilter.value;
    const dateFrom = episodeDateFrom.value;
    const dateTo = episodeDateTo.value;
    const matches = allEpisodes.filter(function (episode) {
      const searchableText = [
        "season " + episode.season,
        "episode " + episode.number,
        "s" + episode.season,
        String(episode.number),
        episode.host,
        episode.musicalGuest,
        episode.date,
        formatEpisodeDate(episode.date)
      ].join(" ").toLowerCase();

      return (!query || searchableText.indexOf(query) !== -1) &&
        (!selectedSeason || String(episode.season) === selectedSeason) &&
        (!dateFrom || episode.date >= dateFrom) &&
        (!dateTo || episode.date <= dateTo);
    });

    episodeDatabaseBody.replaceChildren.apply(episodeDatabaseBody, matches.map(makeEpisodeRow));
    episodeResultCount.textContent = "Showing " + matches.length + " of " + allEpisodes.length + " episodes.";
    episodeEmptyMessage.hidden = matches.length > 0;
  }

  Object.keys(SEASON_EPISODES).forEach(function (season) {
    const option = document.createElement("option");
    option.value = season;
    option.textContent = "Season " + season;
    episodeSeasonFilter.append(option);
  });

  episodeSearchBox.addEventListener("input", renderEpisodeDatabase);
  episodeSeasonFilter.addEventListener("change", renderEpisodeDatabase);
  episodeDateFrom.addEventListener("change", renderEpisodeDatabase);
  episodeDateTo.addEventListener("change", renderEpisodeDatabase);

  const popularSketchGrid = document.getElementById("popular-sketch-grid");
  const fanRankingList = document.getElementById("fan-ranking-list");
  const peopleDatabaseBody = document.getElementById("people-database-body");
  const peopleSearchBox = document.getElementById("people-search-box");
  const peopleRoleFilter = document.getElementById("people-role-filter");
  const peopleSeasonFilter = document.getElementById("people-season-filter");
  const peopleResultCount = document.getElementById("people-result-count");
  const peopleEmptyMessage = document.getElementById("people-empty-message");

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

  function formatPeopleSeasonList(seasons) {
    if (seasons.length === 0) {
      return "—";
    }

    const ranges = [];
    let first = seasons[0];
    let last = first;
    for (let index = 1; index <= seasons.length; index += 1) {
      const current = seasons[index];
      if (current === last + 1) {
        last = current;
        continue;
      }

      ranges.push(first === last ? "S" + first : "S" + first + "–S" + last);
      first = current;
      last = current;
    }

    const startYear = 1974 + seasons[0];
    const endYear = 1975 + seasons[seasons.length - 1];
    return ranges.join(", ") + " · " + startYear + "–" + endYear;
  }

  function makePeopleRow(person) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("th");
    nameCell.scope = "row";
    nameCell.textContent = person.name;

    const roles = [];
    if (person.castSeasons.length > 0) {
      roles.push("Cast member");
    }
    if (person.writerSeasons.length > 0) {
      roles.push("Writer");
    }
    const roleCell = document.createElement("td");
    roleCell.textContent = roles.join(" · ");

    const castCell = document.createElement("td");
    castCell.textContent = formatPeopleSeasonList(person.castSeasons);

    const writerCell = document.createElement("td");
    writerCell.textContent = formatPeopleSeasonList(person.writerSeasons);

    row.append(nameCell, roleCell, castCell, writerCell);
    return row;
  }

  function renderPeopleDatabase() {
    const query = peopleSearchBox.value.trim().toLowerCase();
    const selectedRole = peopleRoleFilter.value;
    const selectedSeason = Number(peopleSeasonFilter.value);
    const seasonQueryMatch = query.match(/^(?:s|season\s+)(\d+)$/);
    const querySeason = seasonQueryMatch ? Number(seasonQueryMatch[1]) : null;
    const matches = SNL_PEOPLE.filter(function (person) {
      const hasCastRole = person.castSeasons.length > 0;
      const hasWriterRole = person.writerSeasons.length > 0;
      const matchesRole = !selectedRole ||
        (selectedRole === "cast" && hasCastRole) ||
        (selectedRole === "writer" && hasWriterRole);
      const matchesSeason = !selectedSeason ||
        ((selectedRole !== "writer" && person.castSeasons.indexOf(selectedSeason) !== -1) ||
          (selectedRole !== "cast" && person.writerSeasons.indexOf(selectedSeason) !== -1));
      const searchableText = [
        person.name,
        hasCastRole ? "cast member cast" : "",
        hasWriterRole ? "writer" : "",
        person.castYears || "",
        person.castSeasons.map(function (season) {
          return "season " + season + " s" + season + " " + (1974 + season) + " " + (1975 + season);
        }).join(" "),
        person.writerSeasons.map(function (season) {
          return "season " + season + " s" + season + " " + (1974 + season) + " " + (1975 + season);
        }).join(" ")
      ].join(" ").toLowerCase();
      const matchesQuery = !query || (querySeason
        ? ((selectedRole !== "writer" && person.castSeasons.indexOf(querySeason) !== -1) ||
          (selectedRole !== "cast" && person.writerSeasons.indexOf(querySeason) !== -1))
        : searchableText.indexOf(query) !== -1);

      return matchesRole && matchesSeason && matchesQuery;
    });

    peopleDatabaseBody.replaceChildren.apply(peopleDatabaseBody, matches.map(makePeopleRow));
    peopleResultCount.textContent = "Showing " + matches.length + " of " + SNL_PEOPLE.length + " people.";
    peopleEmptyMessage.hidden = matches.length > 0;
  }

  popularSketchGrid.replaceChildren.apply(popularSketchGrid, POPULAR_SKETCHES.map(makeSketchCard));
  fanRankingList.replaceChildren.apply(fanRankingList, POPULAR_SKETCHES.map(makeRankingItem));
  for (let seasonNumber = 1; seasonNumber <= 52; seasonNumber += 1) {
    const option = document.createElement("option");
    option.value = String(seasonNumber);
    option.textContent = "Season " + seasonNumber;
    peopleSeasonFilter.append(option);
  }
  peopleSearchBox.addEventListener("input", renderPeopleDatabase);
  peopleRoleFilter.addEventListener("change", renderPeopleDatabase);
  peopleSeasonFilter.addEventListener("change", renderPeopleDatabase);

  // ----------------------------------------------------------
  // 3. Views: show one section at a time, based on the #link in the address bar.
  // ----------------------------------------------------------
  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const views = document.querySelectorAll("[data-view]");
    const matchingView = Array.prototype.find.call(views, function (view) {
      return view.id === requested;
    });
    const seasonMatch = requested.match(/^season-(\d+)$/);
    const episodeMatch = requested.match(/^season-(\d+)-episode-(\d+)$/);
    const seasonNumber = seasonMatch ? Number(seasonMatch[1]) : null;
    const episodeSeasonNumber = episodeMatch ? Number(episodeMatch[1]) : null;
    const episodeNumber = episodeMatch ? Number(episodeMatch[2]) : null;
    const episode = episodeMatch ? findEpisode(episodeSeasonNumber, episodeNumber) : null;
    const seasonExists = seasonMatch && Object.prototype.hasOwnProperty.call(SEASON_EPISODES, String(seasonNumber));
    const home = document.getElementById("home");
    const isArchiveRoute = seasonExists || episode;
    const sectionTarget = !matchingView && !isArchiveRoute && document.getElementById(requested);
    const homeSectionTarget = sectionTarget && home.contains(sectionTarget) ? sectionTarget : null;
    const current = matchingView
      ? requested
      : seasonExists
        ? "season-page"
        : episode
          ? "episode-page"
          : "home";

    if (current === "season-page") {
      renderSeasonPage(seasonNumber);
    } else if (current === "episode-page") {
      renderEpisodePage(episodeSeasonNumber, episode);
    } else if (current === "episodes") {
      renderEpisodeDatabase();
      document.title = "Episode Guide | " + STARTUP.name;
    } else if (current === "cast") {
      renderPeopleDatabase();
      document.title = "Cast & Writers | " + STARTUP.name;
    } else {
      document.title = STARTUP.name;
    }

    views.forEach(function (view) {
      view.hidden = view.id !== current;
    });

    const activeNav = current === "season-page" || current === "episode-page" ? "seasons" : current;
    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + activeNav) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (current === "home" && homeSectionTarget) {
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
