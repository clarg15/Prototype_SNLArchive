// ============================================================
// app.js — what your site DOES.
// Plain JavaScript, no libraries, no installs.
// It uses sample content from data.js, episode listings from episodes.js, and people records from people.js.
// ============================================================

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. Saving ranking changes in this browser (localStorage).
  //    These votes and options are not shared with other visitors.
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
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  let rankingState = storage.get("fanRankings", {});
  if (!rankingState || typeof rankingState !== "object" || Array.isArray(rankingState)) {
    rankingState = {};
  }
  let favoriteState = storage.get("myLists", {});
  if (!favoriteState || typeof favoriteState !== "object" || Array.isArray(favoriteState)) {
    favoriteState = {};
  }

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
  const rankingsGrid = document.getElementById("rankings-grid");
  const peopleDatabaseBody = document.getElementById("people-database-body");
  const peopleSearchBox = document.getElementById("people-search-box");
  const peopleRoleFilter = document.getElementById("people-role-filter");
  const peopleSeasonFilter = document.getElementById("people-season-filter");
  const peopleResultCount = document.getElementById("people-result-count");
  const peopleEmptyMessage = document.getElementById("people-empty-message");
  const rankingCategoryNav = document.getElementById("ranking-category-nav");
  const rankingCategoryTitle = document.getElementById("ranking-category-title");
  const rankingCategoryLabel = document.getElementById("ranking-category-label");
  const rankingOptionList = document.getElementById("ranking-option-list");
  const rankingAddForm = document.getElementById("ranking-add-form");
  const rankingOptionInput = document.getElementById("ranking-option-input");
  const rankingFeedback = document.getElementById("ranking-feedback");
  const myListsGroups = document.getElementById("my-lists-groups");
  const myListsEmpty = document.getElementById("my-lists-empty");
  const myListsFeedback = document.getElementById("my-lists-feedback");
  const sketchSearchBox = document.getElementById("sketch-search-box");
  const sketchSeasonFilter = document.getElementById("sketch-season-filter");
  const sketchResultCount = document.getElementById("sketch-result-count");
  const sketchDatabaseGrid = document.getElementById("sketch-database-grid");
  const sketchEmptyMessage = document.getElementById("sketch-empty-message");
  const sketchDialog = document.getElementById("sketch-dialog");
  const sketchDialogTitle = document.getElementById("sketch-dialog-title");
  const sketchDialogEpisode = document.getElementById("sketch-dialog-episode");
  const sketchDialogCast = document.getElementById("sketch-dialog-cast");
  const sketchDialogEmpty = document.getElementById("sketch-dialog-empty");
  const sketchDialogSource = document.getElementById("sketch-dialog-source");
  const sketchDialogClose = document.getElementById("sketch-dialog-close");

  function makeSketchDatabaseCard(sketch) {
    const card = document.createElement("article");
    card.className = "card sketch-entry-card";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "sketch-entry-button";
    button.setAttribute("aria-label", "View details for " + sketch.title);
    button.addEventListener("click", function () {
      showSketchDetails(sketch);
    });

    const title = document.createElement("span");
    title.className = "sketch-entry-title";
    title.textContent = sketch.title;

    const episode = document.createElement("span");
    episode.className = "sketch-entry-meta";
    episode.textContent = "Season " + sketch.season + " · Episode " + sketch.episode;

    const host = document.createElement("span");
    host.className = "sketch-entry-host";
    host.textContent = sketch.host + " · " + formatEpisodeDate(sketch.airDate);

    button.append(title, episode, host);
    card.append(button);
    return card;
  }

  function renderSketchDatabase() {
    const query = sketchSearchBox.value.trim().toLowerCase();
    const selectedSeason = sketchSeasonFilter.value;
    const matches = SNL_SKETCHES.filter(function (sketch) {
      const searchableText = [
        sketch.title,
        "season " + sketch.season,
        "episode " + sketch.episode,
        sketch.host,
        sketch.castRoles.map(function (performer) {
          return performer.name + " " + performer.role;
        }).join(" "),
        sketch.airDate
      ].join(" ").toLowerCase();

      return (!query || searchableText.indexOf(query) !== -1) &&
        (!selectedSeason || String(sketch.season) === selectedSeason);
    });

    sketchDatabaseGrid.replaceChildren.apply(sketchDatabaseGrid, matches.map(makeSketchDatabaseCard));
    sketchResultCount.textContent = "Showing " + matches.length + " of " + SNL_SKETCHES.length + " sketches.";
    sketchEmptyMessage.hidden = matches.length > 0;
  }

  function showSketchDetails(sketch) {
    sketchDialogTitle.textContent = sketch.title;
    sketchDialogEpisode.textContent = "Season " + sketch.season + ", Episode " + sketch.episode +
      " · " + sketch.host + " · " + formatEpisodeDate(sketch.airDate);
    const castRows = sketch.castRoles.map(function (performer) {
      const item = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = performer.name;
      const role = document.createElement("span");
      role.textContent = performer.role;
      item.append(name, role);
      return item;
    });
    sketchDialogCast.replaceChildren.apply(sketchDialogCast, castRows);
    sketchDialogEmpty.hidden = castRows.length > 0;
    sketchDialogSource.replaceChildren();

    if (sketch.source && sketch.source.url) {
      const sourceLink = document.createElement("a");
      sourceLink.href = sketch.source.url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "Source: " + sketch.source.name;
      sketchDialogSource.append(sourceLink);
    }

    sketchDialog.showModal();
  }

  const sketchSeasons = Array.from(new Set(SNL_SKETCHES.map(function (sketch) {
    return sketch.season;
  }))).sort(function (first, second) {
    return first - second;
  });
  sketchSeasons.forEach(function (season) {
    const option = document.createElement("option");
    option.value = String(season);
    option.textContent = "Season " + season;
    sketchSeasonFilter.append(option);
  });
  sketchSearchBox.addEventListener("input", renderSketchDatabase);
  sketchSeasonFilter.addEventListener("change", renderSketchDatabase);
  sketchDialogClose.addEventListener("click", function () {
    sketchDialog.close();
  });

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

  let activeRankingCategory = RANKING_CATEGORIES[0];

  function getRankingEntries(category) {
    const storedEntries = rankingState[category.id];
    if (Array.isArray(storedEntries)) {
      return storedEntries.filter(function (entry) {
        return entry && typeof entry.id === "string" &&
          typeof entry.name === "string" && entry.name.trim() &&
          Number.isFinite(entry.votes) && entry.votes >= 0;
      }).map(function (entry) {
        return {
          id: entry.id,
          name: entry.name,
          votes: Math.floor(entry.votes),
          userVoted: entry.userVoted === true
        };
      });
    }

    return category.entries.map(function (entry, index) {
      return {
        id: category.id + "-seed-" + index,
        name: entry.name,
        votes: entry.votes,
        userVoted: false
      };
    });
  }

  function getFavoriteIds(category) {
    const storedIds = favoriteState[category.id];
    if (!Array.isArray(storedIds)) {
      return [];
    }

    return storedIds.filter(function (entryId, index) {
      return typeof entryId === "string" && storedIds.indexOf(entryId) === index;
    });
  }

  function isRankingFavorite(category, entryId) {
    return getFavoriteIds(category).indexOf(entryId) !== -1;
  }

  function makeRankingCard(category) {
    const card = document.createElement("article");
    card.className = "card ranking-card";

    const title = document.createElement("h3");
    title.textContent = category.title;

    const list = document.createElement("ol");
    list.className = "category-ranking-list";
    getRankingEntries(category)
      .sort(function (first, second) {
        return second.votes - first.votes || first.name.localeCompare(second.name);
      })
      .slice(0, 3)
      .forEach(function (entry, index) {
        const item = document.createElement("li");

        const rank = document.createElement("span");
        rank.className = "category-ranking-number";
        rank.textContent = String(index + 1).padStart(2, "0");

        const name = document.createElement("span");
        name.textContent = entry.name;

        const votes = document.createElement("span");
        votes.className = "category-ranking-votes";
        votes.textContent = entry.votes + (entry.votes === 1 ? " vote" : " votes");

        item.append(rank, name, votes);
        list.append(item);
      });

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "#rankings-" + category.id;
    link.textContent = "View ranking →";
    link.setAttribute("aria-label", "View fan ranking for " + category.title);

    card.append(title, list, link);
    return card;
  }

  function renderHomeRankingCards() {
    rankingsGrid.replaceChildren.apply(rankingsGrid, RANKING_CATEGORIES.map(makeRankingCard));
  }

  function renderRankingCategory(category, feedbackMessage) {
    activeRankingCategory = category;
    rankingCategoryTitle.textContent = category.title;
    rankingCategoryLabel.textContent = category.title.toLowerCase();
    rankingFeedback.textContent = feedbackMessage || "";

    rankingCategoryNav.replaceChildren.apply(rankingCategoryNav, RANKING_CATEGORIES.map(function (item) {
      const link = document.createElement("a");
      link.href = "#rankings-" + item.id;
      link.textContent = item.title;
      if (item.id === category.id) {
        link.setAttribute("aria-current", "page");
      }
      return link;
    }));

    const rankingItems = getRankingEntries(category)
      .sort(function (first, second) {
        return second.votes - first.votes || first.name.localeCompare(second.name);
      })
      .map(function (entry, index) {
        const item = document.createElement("li");
        item.className = "interactive-ranking-item";

        const position = document.createElement("span");
        position.className = "interactive-ranking-position";
        position.textContent = String(index + 1).padStart(2, "0");

        const name = document.createElement("span");
        name.className = "interactive-ranking-name";
        name.textContent = entry.name;

        const controls = document.createElement("div");
        controls.className = "ranking-vote-controls";

        const votes = document.createElement("span");
        votes.className = "ranking-vote-count";
        votes.textContent = entry.votes + (entry.votes === 1 ? " vote" : " votes");

        const button = document.createElement("button");
        button.type = "button";
        button.className = entry.userVoted
          ? "button secondary ranking-vote-button is-active"
          : "button secondary ranking-vote-button";
        button.textContent = entry.userVoted ? "Upvoted" : "Upvote";
        button.setAttribute("aria-pressed", entry.userVoted ? "true" : "false");
        button.setAttribute("aria-label", (entry.userVoted ? "Remove upvote from " : "Upvote ") + entry.name);
        button.addEventListener("click", function () {
          toggleRankingVote(category, entry.id);
        });

        const favoriteButton = document.createElement("button");
        const isFavorite = isRankingFavorite(category, entry.id);
        favoriteButton.type = "button";
        favoriteButton.className = isFavorite
          ? "button secondary ranking-favorite-button is-active"
          : "button secondary ranking-favorite-button";
        favoriteButton.textContent = isFavorite ? "Saved" : "Save";
        favoriteButton.setAttribute("aria-pressed", isFavorite ? "true" : "false");
        favoriteButton.setAttribute("aria-label", (isFavorite ? "Remove " : "Save ") + entry.name + " " +
          (isFavorite ? "from" : "to") + " My Lists");
        favoriteButton.addEventListener("click", function () {
          toggleRankingFavorite(category, entry.id, false);
        });

        controls.append(votes, button, favoriteButton);
        item.append(position, name, controls);
        return item;
      });

    rankingOptionList.replaceChildren.apply(rankingOptionList, rankingItems);
  }

  function getFavoriteEntries(category) {
    const favoriteIds = getFavoriteIds(category);
    return getRankingEntries(category).filter(function (entry) {
      return favoriteIds.indexOf(entry.id) !== -1;
    }).sort(function (first, second) {
      return second.votes - first.votes || first.name.localeCompare(second.name);
    });
  }

  function makeMyListCategory(category, entries) {
    const card = document.createElement("article");
    card.className = "card my-list-category";

    const heading = document.createElement("div");
    heading.className = "my-list-category-heading";

    const title = document.createElement("h2");
    title.textContent = category.title;

    const categoryLink = document.createElement("a");
    categoryLink.className = "card-link";
    categoryLink.href = "#rankings-" + category.id;
    categoryLink.textContent = "Browse ranking →";
    heading.append(title, categoryLink);

    const list = document.createElement("ul");
    list.className = "my-list-items";
    entries.forEach(function (entry) {
      const item = document.createElement("li");
      item.className = "my-list-item";

      const name = document.createElement("span");
      name.className = "my-list-item-name";
      name.textContent = entry.name;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "button secondary my-list-remove-button";
      removeButton.textContent = "Remove";
      removeButton.setAttribute("aria-label", "Remove " + entry.name + " from My Lists");
      removeButton.addEventListener("click", function () {
        toggleRankingFavorite(category, entry.id, true);
      });

      item.append(name, removeButton);
      list.append(item);
    });

    card.append(heading, list);
    return card;
  }

  function renderMyLists(feedbackMessage) {
    const groups = RANKING_CATEGORIES.map(function (category) {
      const entries = getFavoriteEntries(category);
      return entries.length ? makeMyListCategory(category, entries) : null;
    }).filter(Boolean);

    myListsGroups.replaceChildren.apply(myListsGroups, groups);
    myListsEmpty.hidden = groups.length > 0;
    myListsFeedback.textContent = feedbackMessage || "";
  }

  function toggleRankingFavorite(category, entryId, fromMyLists) {
    const entryExists = getRankingEntries(category).some(function (entry) {
      return entry.id === entryId;
    });
    if (!entryExists) {
      const errorMessage = "That option could not be found. Please refresh and try again.";
      if (fromMyLists) {
        renderMyLists(errorMessage);
      } else {
        renderRankingCategory(category, errorMessage);
      }
      return;
    }

    const wasSaved = isRankingFavorite(category, entryId);
    const updatedIds = getFavoriteIds(category).filter(function (id) {
      return id !== entryId;
    });
    if (!wasSaved) {
      updatedIds.push(entryId);
    }

    const updatedState = Object.assign({}, favoriteState);
    updatedState[category.id] = updatedIds;
    if (!storage.set("myLists", updatedState)) {
      const errorMessage = "This browser could not save your favorite. It will be lost when you leave this page.";
      if (fromMyLists) {
        renderMyLists(errorMessage);
      } else {
        renderRankingCategory(category, errorMessage);
      }
      return;
    }

    favoriteState = updatedState;
    const successMessage = wasSaved ? "Favorite removed from My Lists." : "Favorite saved to My Lists.";
    if (fromMyLists) {
      renderMyLists(successMessage);
    } else {
      renderRankingCategory(category, successMessage);
      renderMyLists();
    }
  }

  function saveRankingEntries(category, entries, successMessage) {
    rankingState[category.id] = entries;
    renderHomeRankingCards();
    const wasSaved = storage.set("fanRankings", rankingState);
    renderRankingCategory(category, wasSaved
      ? successMessage
      : "This browser could not save your change. It will be lost when you leave this page.");
  }

  function toggleRankingVote(category, entryId) {
    const entries = getRankingEntries(category);
    const entry = entries.find(function (item) { return item.id === entryId; });
    if (!entry) {
      renderRankingCategory(category, "That option could not be found. Please refresh and try again.");
      return;
    }

    if (entry.userVoted) {
      entry.votes = Math.max(0, entry.votes - 1);
      entry.userVoted = false;
    } else {
      entry.votes += 1;
      entry.userVoted = true;
    }
    saveRankingEntries(category, entries, entry.userVoted ? "Your upvote was added." : "Your upvote was removed.");
  }

  rankingAddForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = rankingOptionInput.value.trim();
    if (!name) {
      rankingFeedback.textContent = "Enter an option name.";
      return;
    }

    const entries = getRankingEntries(activeRankingCategory);
    if (entries.some(function (entry) { return entry.name.toLowerCase() === name.toLowerCase(); })) {
      rankingFeedback.textContent = "That option is already on this list.";
      return;
    }

    let id = activeRankingCategory.id + "-user-" + Date.now();
    while (entries.some(function (entry) { return entry.id === id; })) {
      id += "-new";
    }
    entries.push({ id: id, name: name, votes: 0, userVoted: false });
    rankingOptionInput.value = "";
    saveRankingEntries(activeRankingCategory, entries, "Your option was added to the ranking.");
  });

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
  renderHomeRankingCards();
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
    const rankingCategoryId = requested.indexOf("rankings-") === 0
      ? requested.slice("rankings-".length)
      : null;
    const rankingCategory = RANKING_CATEGORIES.find(function (category) {
      return category.id === rankingCategoryId;
    });
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
    let current = "home";
    if (matchingView) {
      current = requested;
    } else if (rankingCategory) {
      current = "rankings";
    } else if (seasonExists) {
      current = "season-page";
    } else if (episode) {
      current = "episode-page";
    }

    if (current === "season-page") {
      renderSeasonPage(seasonNumber);
    } else if (current === "episode-page") {
      renderEpisodePage(episodeSeasonNumber, episode);
    } else if (current === "rankings") {
      const category = rankingCategory || RANKING_CATEGORIES[0];
      renderRankingCategory(category);
      document.title = category.title + " Fan Rankings | " + STARTUP.name;
    } else if (current === "my-lists") {
      renderMyLists();
      document.title = "My Lists | " + STARTUP.name;
    } else if (current === "episodes") {
      renderEpisodeDatabase();
      document.title = "Episode Guide | " + STARTUP.name;
    } else if (current === "sketches") {
      renderSketchDatabase();
      document.title = "Sketch Database | " + STARTUP.name;
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
    document.querySelectorAll(".primary-nav a, .footer-nav a").forEach(function (link) {
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
  // 5. Start up.
  // ----------------------------------------------------------
  renderHomeRankingCards();
  showView();
})();
