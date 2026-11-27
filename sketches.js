const SKETCH_SOURCES = {
  classic: {
    name: "Wikipedia: List of Saturday Night Live sketches",
    url: "https://en.wikipedia.org/wiki/List_of_Saturday_Night_Live_sketches"
  },
  1980: {
    name: "Wikipedia: Sketches introduced in 1980–81",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_1980%E2%80%9381"
  },
  1985: {
    name: "Wikipedia: Sketches introduced in 1985–86",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_1985%E2%80%9386"
  },
  1991: {
    name: "Wikipedia: Sketches introduced in 1991–92",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_1991%E2%80%9392"
  },
  1995: {
    name: "Wikipedia: Sketches introduced in 1995–96",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_1995%E2%80%9396"
  },
  2000: {
    name: "Wikipedia: Sketches introduced in 2000–01",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_2000%E2%80%9301"
  },
  2005: {
    name: "Wikipedia: Sketches introduced in 2005–06",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_2005%E2%80%9306"
  },
  2011: {
    name: "Wikipedia: Sketches introduced in 2011–12",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_2011%E2%80%9312"
  },
  2016: {
    name: "Wikipedia: Sketches introduced in 2016–17",
    url: "https://en.wikipedia.org/wiki/Recurring_Saturday_Night_Live_characters_and_sketches_introduced_2016%E2%80%9317"
  },
  recent: {
    name: "Wikipedia: List of Saturday Night Live sketches",
    url: "https://en.wikipedia.org/wiki/List_of_Saturday_Night_Live_sketches"
  }
};

const SKETCH_RECORDS = [
  {id:"land-shark",title:"Land Shark",airDate:"1975-11-08",castRoles:[{name:"Chevy Chase",role:"Land Shark"}],source:"classic"},
  {id:"emily-litella",title:"Emily Litella",airDate:"1975-12-13",castRoles:[{name:"Gilda Radner",role:"Emily Litella"}],source:"classic"},
  {id:"samurai",title:"Samurai",airDate:"1975-12-13",castRoles:[{name:"John Belushi",role:"Samurai"}],source:"classic"},
  {id:"mr-bill",title:"Mr. Bill",airDate:"1976-02-28",castRoles:[{name:"Vance DeGeneres",role:"Mr. Hands"}],source:"classic"},
  {id:"consumer-probe",title:"Consumer Probe",airDate:"1976-12-11",castRoles:[{name:"Dan Aykroyd",role:"Irwin Mainway"}],source:"classic"},
  {id:"coneheads",title:"Coneheads",airDate:"1977-01-15",castRoles:[{name:"Dan Aykroyd",role:"Beldar"},{name:"Jane Curtin",role:"Prymaat"},{name:"Laraine Newman",role:"Connie"}],source:"classic"},
  {id:"e-buzz-miller",title:"E. Buzz Miller and Christie Christina",airDate:"1977-01-22",castRoles:[{name:"Dan Aykroyd",role:"E. Buzz Miller"},{name:"Laraine Newman",role:"Christie Christina"}],source:"classic"},

  {id:"vickie-and-debbie",title:"Vickie & Debbie",airDate:"1980-11-15",castRoles:[{name:"Gail Matthius",role:"Performer"},{name:"Denny Dillon",role:"Performer"}],source:"1980"},
  {id:"whats-it-all-about",title:"What's It All About",airDate:"1980-11-15",castRoles:[{name:"Gilbert Gottfried",role:"Performer"},{name:"Denny Dillon",role:"Performer"}],source:"1980"},
  {id:"paulie-herman",title:"Paulie Herman",airDate:"1980-12-06",castRoles:[{name:"Joe Piscopo",role:"Paulie Herman"}],source:"1980"},
  {id:"raheem-abdul-muhammed",title:"Raheem Abdul Muhammed",airDate:"1980-12-06",castRoles:[{name:"Eddie Murphy",role:"Raheem Abdul Muhammed"}],source:"1980"},
  {id:"mary-louise",title:"Mary Louise",airDate:"1980-12-06",castRoles:[{name:"Denny Dillon",role:"Mary Louise"}],source:"1980"},
  {id:"nadine-and-rowena",title:"Nadine and Rowena",airDate:"1980-12-13",castRoles:[{name:"Denny Dillon",role:"Performer"},{name:"Gail Matthius",role:"Performer"}],source:"1980"},

  {id:"cabrini-green-jackson",title:"Cabrini Green Jackson",airDate:"1985-11-09",castRoles:[{name:"Danitra Vance",role:"Cabrini Green Jackson"}],source:"1985"},
  {id:"jones-brothers",title:"The Jones Brothers",airDate:"1985-11-09",castRoles:[{name:"Damon Wayans",role:"Jones brother"},{name:"Anthony Michael Hall",role:"Jones brother"}],source:"1985"},
  {id:"limits-of-imagination",title:"The Limits of the Imagination",airDate:"1985-11-09",castRoles:[{name:"Randy Quaid",role:"The Floating Head"}],source:"1985"},
  {id:"pat-stevens-show",title:"The Pat Stevens Show",airDate:"1985-11-16",castRoles:[{name:"Nora Dunn",role:"Pat Stevens"}],source:"1985"},
  {id:"craig-sundberg",title:"Craig Sundberg, Idiot Savant",airDate:"1985-11-16",castRoles:[{name:"Anthony Michael Hall",role:"Craig Sundberg"}],source:"1985"},
  {id:"tommy-flanagan",title:"Tommy Flanagan, the Pathological Liar",airDate:"1985-11-16",castRoles:[{name:"Jon Lovitz",role:"Tommy Flanagan"}],source:"1985"},

  {id:"tales-from-the-barbecue",title:"Tales From The Barbecue",airDate:"1991-09-28",castRoles:[{name:"Tim Meadows",role:"The older man"},{name:"Chris Rock",role:"The younger man"}],source:"1991"},
  {id:"zoraida",title:"Zoraida the NBC Page",airDate:"1991-09-28",castRoles:[{name:"Ellen Cleghorne",role:"Zoraida"}],source:"1991"},
  {id:"chris-farley-show",title:"The Chris Farley Show",airDate:"1991-10-05",castRoles:[{name:"Chris Farley",role:"Interviewer"}],source:"1991"},
  {id:"queen-shenequa",title:"Queen Shenequa",airDate:"1991-10-26",castRoles:[{name:"Ellen Cleghorne",role:"Queen Shenequa"}],source:"1991"},
  {id:"mark-strobel",title:"Mark Strobel",airDate:"1991-11-02",castRoles:[{name:"Chris Farley",role:"Mark Strobel"}],source:"1991"},
  {id:"unfrozen-caveman-lawyer",title:"Unfrozen Caveman Lawyer",airDate:"1991-11-23",castRoles:[{name:"Phil Hartman",role:"Unfrozen Caveman Lawyer"}],source:"1991"},
  {id:"dick-clarks-receptionist",title:"Dick Clark's Receptionist",airDate:"1991-12-07",castRoles:[{name:"David Spade",role:"Receptionist"}],source:"1991"},
  {id:"theatre-stories",title:"Theatre Stories",airDate:"1991-12-14",castRoles:[{name:"Mike Myers",role:"Kenneth Rhys-Evans"},{name:"Dana Carvey",role:"Mickey Rooney"}],source:"1991"},
  {id:"jan-brady",title:"Jan Brady",airDate:"1992-01-11",castRoles:[{name:"Melanie Hutsell",role:"Jan Brady"}],source:"1991"},
  {id:"delta-delta-delta",title:"Delta Delta Delta",airDate:"1992-01-11",castRoles:[{name:"Melanie Hutsell",role:"Performer"},{name:"Siobhan Fallon Hogan",role:"Performer"},{name:"Beth Cahill",role:"Performer"}],source:"1991"},

  {id:"get-off-the-shed",title:"Get Off the Shed!",airDate:"1995-09-30",castRoles:[{name:"Will Ferrell",role:"Frank Henderson"},{name:"David Koechner",role:"Tom"},{name:"Nancy Carell",role:"Susan Taylor"}],source:"1995"},
  {id:"leg-up",title:"Leg Up",airDate:"1995-09-30",castRoles:[{name:"Molly Shannon",role:"Ann Miller"},{name:"Cheri Oteri",role:"Debbie Reynolds"}],source:"1995"},
  {id:"nightline",title:"Nightline",airDate:"1995-09-30",castRoles:[{name:"Darrell Hammond",role:"Ted Koppel"}],source:"1995"},
  {id:"spade-in-america",title:"Spade in America",airDate:"1995-09-30",castRoles:[{name:"David Spade",role:"Host"}],source:"1995"},
  {id:"mickey-the-dyke",title:"Mickey the Dyke",airDate:"1995-09-30",castRoles:[{name:"Cheri Oteri",role:"Mickey"}],source:"1995"},
  {id:"rita-delvecchio",title:"Rita DelVecchio",airDate:"1995-10-21",castRoles:[{name:"Cheri Oteri",role:"Rita DelVecchio"}],source:"1995"},
  {id:"mary-katherine-gallagher",title:"Mary Katherine Gallagher",airDate:"1995-10-28",castRoles:[{name:"Molly Shannon",role:"Mary Katherine Gallagher"}],source:"1995"},
  {id:"spartan-cheerleaders",title:"The Spartan Cheerleaders",airDate:"1995-11-11",castRoles:[{name:"Will Ferrell",role:"Craig Buchanan"},{name:"Cheri Oteri",role:"Arianna Prescott"}],source:"1995"},
  {id:"stan-hooper",title:"Stan Hooper",airDate:"1995-11-11",castRoles:[{name:"Norm Macdonald",role:"Stan Hooper"}],source:"1995"},
  {id:"british-fops",title:"The British Fops",airDate:"1995-11-11",castRoles:[{name:"Mark McKinney",role:"Lucien Callow"},{name:"David Koechner",role:"Fagan"}],source:"1995"},
  {id:"joe-blow",title:"Joe Blow",airDate:"1995-11-18",castRoles:[{name:"Colin Quinn",role:"Joe Blow"}],source:"1995"},
  {id:"joe-pesci-show",title:"The Joe Pesci Show",airDate:"1995-12-02",castRoles:[{name:"Jim Breuer",role:"Joe Pesci"}],source:"1995"},

  {id:"geminis-twin",title:"Gemini's Twin",airDate:"2000-11-04",castRoles:[{name:"Maya Rudolph",role:"Jonette"},{name:"Ana Gasteyer",role:"Britanica"}],source:"2000"},
  {id:"jeannie-darcy",title:"Jeannie Darcy",airDate:"2000-11-18",castRoles:[{name:"Molly Shannon",role:"Jeannie Darcy"}],source:"2000"},
  {id:"rap-street",title:"Rap Street",airDate:"2000-11-18",castRoles:[{name:"Jerry Minor",role:"Grandmaster Rap"},{name:"Horatio Sanz",role:"Kid Shazzam"}],source:"2000"},
  {id:"veronica-and-co",title:"Veronica & Co.",airDate:"2000-12-09",castRoles:[{name:"Molly Shannon",role:"Veronica"},{name:"Chris Parnell",role:"Times Square robot"}],source:"2000"},
  {id:"i-wish-it-was-christmas-today",title:"I Wish It Was Christmas Today",airDate:"2000-12-09",castRoles:[{name:"Jimmy Fallon",role:"Performer"},{name:"Horatio Sanz",role:"Performer"},{name:"Chris Kattan",role:"Performer"},{name:"Tracy Morgan",role:"Performer"}],source:"2000"},
  {id:"jarrets-room",title:"Jarret's Room",airDate:"2000-12-16",castRoles:[{name:"Jimmy Fallon",role:"Jarret"},{name:"Horatio Sanz",role:"Gobi"}],source:"2000"},

  {id:"voice-recording-woman",title:"Voice Recording Woman",airDate:"2005-10-08",castRoles:[{name:"Rachel Dratch",role:"Julie"},{name:"Jon Heder",role:"Gary"}],source:"2005"},
  {id:"deep-house-dish",title:"Deep House Dish",airDate:"2005-11-19",castRoles:[{name:"Kenan Thompson",role:"DJ Dynasty Handbag"},{name:"Rachel Dratch",role:"Tiara Zee"},{name:"Amy Poehler",role:"Tres Latraj"}],source:"2005"},
  {id:"vincent-prices-holiday-special",title:"Vincent Price's Holiday Special",airDate:"2005-11-19",castRoles:[{name:"Bill Hader",role:"Vincent Price"}],source:"2005"},

  {id:"j-pop-america-fun-time-now",title:"J-Pop America Fun Time Now",airDate:"2011-10-15",castRoles:[{name:"Taran Killam",role:"Jonathan Cavanaugh"},{name:"Vanessa Bayer",role:"Rebecca Stern-Markowitz"},{name:"Jason Sudeikis",role:"Mark Kaufman"}],source:"2011"},
  {id:"lord-wyndemere",title:"Lord Wyndemere",airDate:"2011-10-15",castRoles:[{name:"Paul Brittain",role:"Lord Cecil Wyndemere"}],source:"2011"},
  {id:"getting-freaky-with-cee-lo",title:"Getting Freaky with Cee-Lo Green!",airDate:"2011-11-05",castRoles:[{name:"Kenan Thompson",role:"Cee-Lo Green"},{name:"Bill Hader",role:"Colonel Nasty"}],source:"2011"},
  {id:"technology-hump",title:"We're Going to Make Technology Hump",airDate:"2011-11-12",castRoles:[{name:"Andy Samberg",role:"Host"}],source:"2011"},
  {id:"drunk-uncle",title:"Drunk Uncle",airDate:"2011-12-03",castRoles:[{name:"Bobby Moynihan",role:"Dale Norway"}],source:"2011"},

  {id:"action-9-news",title:"Action 9 News At Five",airDate:"2016-10-01",castRoles:[{name:"Mikey Day",role:"Matt Schatt"},{name:"Margot Robbie",role:"Alexandra Kennedy-Schatt"}],source:"2016"},
  {id:"matt-pat-schatt",title:"Matt Pat Schatt",airDate:"2016-10-01",castRoles:[{name:"Mikey Day",role:"Matt Schatt"},{name:"Margot Robbie",role:"Alexandra Kennedy-Schatt"}],source:"2016"},
  {id:"debette-goldry",title:"Debette Goldry",airDate:"2016-10-01",castRoles:[{name:"Kate McKinnon",role:"Debette Goldry"}],source:"2016"},
  {id:"melania-moments",title:"Melania Moments",airDate:"2016-10-01",castRoles:[{name:"Cecily Strong",role:"Melania Trump"},{name:"Beck Bennett",role:"Narrator"}],source:"2016"},
  {id:"david-s-pumpkins",title:"Haunted Elevator (David S. Pumpkins)",airDate:"2016-10-22",castRoles:[{name:"Tom Hanks",role:"David S. Pumpkins"},{name:"Bobby Moynihan",role:"Skeleton sidekick"},{name:"Mikey Day",role:"Skeleton sidekick"}],source:"2016"},

  {id:"angelo",title:"Angelo",airDate:"2021-10-16",castRoles:[{name:"Aristotle Athari",role:"Angelo"}],source:"recent"},
  {id:"trend-forecasters",title:"Trend Forecasters",airDate:"2022-01-29",castRoles:[{name:"Aidy Bryant",role:"Trend forecaster"},{name:"Bowen Yang",role:"Trend forecaster"}],source:"recent"},
  {id:"lisa-from-temecula",title:"Lisa from Temecula",airDate:"2023-02-04",castRoles:[{name:"Ego Nwodim",role:"Lisa"}],source:"recent"},
  {id:"domingo",title:"Domingo",airDate:"2024-10-12",castRoles:[{name:"Marcello Hernández",role:"Domingo"}],source:"recent"},
  {id:"the-movie-guy",title:"The Movie Guy",airDate:"2025-03-01",castRoles:[{name:"Marcello Hernández",role:"The Movie Guy"}],source:"recent"}
];

const SNL_SKETCHES = SKETCH_RECORDS.map(function (sketch) {
  let episodeDetails = null;
  let seasonNumber = null;

  Object.keys(SEASON_EPISODES).some(function (season) {
    const episode = SEASON_EPISODES[season].find(function (record) {
      return record.date === sketch.airDate;
    });

    if (episode) {
      episodeDetails = episode;
      seasonNumber = Number(season);
      return true;
    }

    return false;
  });

  if (!episodeDetails) {
    throw new Error("No episode record found for sketch: " + sketch.title + " (" + sketch.airDate + ")");
  }

  return {
    id: sketch.id,
    title: sketch.title,
    airDate: sketch.airDate,
    season: seasonNumber,
    episode: episodeDetails.number,
    host: episodeDetails.host,
    castRoles: sketch.castRoles,
    source: SKETCH_SOURCES[sketch.source]
  };
});
