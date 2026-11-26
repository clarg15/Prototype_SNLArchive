// Curated SNL cast highlights: years and season counts from the cast list, characters from recurring-role references.
// Sources are linked on the Cast page; character notes are short original summaries, not an official ranking.
const CAST_MEMBERS = [
  {
    name: "Chevy Chase",
    years: "1975–1976",
    totalSeasons: 2,
    characters: [
      { name: "Gerald Ford", description: "A recurring impression of the U.S. president." },
      { name: "Land Shark", description: "A comic creature who appears at unsuspecting people's doors." }
    ]
  },
  {
    name: "Dan Aykroyd",
    years: "1975–1979",
    totalSeasons: 4,
    characters: [
      { name: "Beldar Conehead", description: "The alien father in the Conehead family sketches." },
      { name: "E. Buzz Miller", description: "A flamboyant pitchman for dubious consumer products." },
      { name: "Fred Garvin", description: "A male escort character in recurring sketches." }
    ]
  },
  {
    name: "John Belushi",
    years: "1975–1979",
    totalSeasons: 4,
    characters: [
      { name: "Samurai Futaba", description: "A sword-wielding character placed in everyday jobs." },
      { name: "Jake Blues", description: "The blues musician from The Blues Brothers sketches." },
      { name: "Henry Kissinger", description: "A recurring impression of the U.S. diplomat." }
    ]
  },
  {
    name: "Gilda Radner",
    years: "1975–1980",
    totalSeasons: 5,
    characters: [
      { name: "Emily Litella", description: "A gentle commentator who mishears the topic of her reports." },
      { name: "Roseanne Roseannadanna", description: "A free-associating Weekend Update correspondent." },
      { name: "Baba Wawa", description: "A comic impression of journalist Barbara Walters." }
    ]
  },
  {
    name: "Jane Curtin",
    years: "1975–1980",
    totalSeasons: 5,
    characters: [
      { name: "Prymaat Conehead", description: "The Conehead family's practical, sharp-witted matriarch." },
      { name: "Enid Loopner", description: "Lisa Loopner's mother in the Nerds sketches." },
      { name: "Weekend Update", description: "An original anchor of the show's satirical news segment." }
    ]
  },
  {
    name: "Eddie Murphy",
    years: "1980–1984",
    totalSeasons: 4,
    characters: [
      { name: "Buckwheat", description: "A grown-up take on the Our Gang character." },
      { name: "Gumby", description: "A grumpy version of the familiar clay animation figure." },
      { name: "Mr. Robinson", description: "A parody of a friendly children's television host." }
    ]
  },
  {
    name: "Martin Short",
    years: "1984–1985",
    totalSeasons: 1,
    characters: [
      { name: "Ed Grimley", description: "An eccentric, triangle-playing enthusiast." },
      { name: "Nathan Thurm", description: "A nervous, evasive corporate lawyer." },
      { name: "Jackie Rogers Jr.", description: "An overconfident entertainer and game-show host." }
    ]
  },
  {
    name: "Dana Carvey",
    years: "1986–1993",
    totalSeasons: 7,
    characters: [
      { name: "The Church Lady", description: "A judgmental churchgoer suspicious of modern temptations." },
      { name: "A Grumpy Old Man", description: "A grouchy character who complains about the present day." },
      { name: "Hans and Franz", description: "Bodybuilding enthusiasts, performed with Kevin Nealon." }
    ]
  },
  {
    name: "Phil Hartman",
    years: "1986–1994",
    totalSeasons: 8,
    characters: [
      { name: "Unfrozen Caveman Lawyer", description: "A prehistoric man who becomes a courtroom attorney." },
      { name: "Eugene, the Anal-Retentive Chef", description: "A fastidious host of a cooking-show parody." },
      { name: "Frankenstein's Monster", description: "A recurring portrayal of the classic monster." }
    ]
  },
  {
    name: "Mike Myers",
    years: "1989–1995",
    totalSeasons: 7,
    characters: [
      { name: "Wayne Campbell", description: "The laid-back host of Wayne's World." },
      { name: "Dieter", description: "The host of the surreal German television parody Sprockets." },
      { name: "Linda Richman", description: "The host of Coffee Talk, known for her warm-up ritual." }
    ]
  },
  {
    name: "Chris Farley",
    years: "1990–1995",
    totalSeasons: 5,
    characters: [
      { name: "Matt Foley", description: "An exuberant motivational speaker with an unconventional approach." },
      { name: "Bennett Brauer", description: "A shamelessly gross man interviewed on Weekend Update." },
      { name: "The Chris Farley Show", description: "An awkward celebrity interviewer who struggles through questions." }
    ]
  },
  {
    name: "Adam Sandler",
    years: "1991–1995",
    totalSeasons: 5,
    characters: [
      { name: "Opera Man", description: "A high-pitched opera singer who comments on the news." },
      { name: "Canteen Boy", description: "An eager and earnest scout." },
      { name: "Cajun Man", description: "A fast-talking character with a Cajun-inspired persona." }
    ]
  },
  {
    name: "Molly Shannon",
    years: "1995–2001",
    totalSeasons: 7,
    characters: [
      { name: "Mary Katherine Gallagher", description: "An excitable Catholic school student who dreams of stardom." },
      { name: "Sally O'Malley", description: "A proudly energetic dancer who is over 50." },
      { name: "Helen Madden", description: "A self-described joyologist and lifestyle coach." }
    ]
  },
  {
    name: "Will Ferrell",
    years: "1995–2002",
    totalSeasons: 7,
    characters: [
      { name: "Craig Buchanan", description: "One half of the enthusiastic Spartan Cheerleaders." },
      { name: "Alex Trebek", description: "His host impression in Celebrity Jeopardy! sketches." },
      { name: "Robert Goulet", description: "A recurring impression of the singer and actor." }
    ]
  },
  {
    name: "Tina Fey",
    years: "2000–2006",
    totalSeasons: 6,
    characters: [
      { name: "Sarah Palin", description: "Her widely recognized 2008 vice-presidential candidate impression." },
      { name: "Weekend Update", description: "Anchored the satirical news segment with Jimmy Fallon, then Amy Poehler." }
    ]
  },
  {
    name: "Amy Poehler",
    years: "2001–2008",
    totalSeasons: 8,
    characters: [
      { name: "Betty Caruso", description: "A co-host of the Bronx Beat talk-show sketches." },
      { name: "Amber", description: "A recurring contestant on reality-TV parody sketches." },
      { name: "Hillary Clinton", description: "A recurring political impression." }
    ]
  },
  {
    name: "Kenan Thompson",
    years: "2003–present",
    totalSeasons: 24,
    characters: [
      { name: "Diondre Cole", description: "The exuberant host of the music-and-dance show What's Up with That?" },
      { name: "Jean K. Jean", description: "A French comedian who appears on Weekend Update." },
      { name: "DJ Dynasty Handbag", description: "A club DJ featured in Deep House Dish sketches." }
    ]
  },
  {
    name: "Kristen Wiig",
    years: "2005–2012",
    totalSeasons: 7,
    characters: [
      { name: "The Target Lady", description: "An overly enthusiastic cashier who shares too much." },
      { name: "Penelope", description: "A compulsive one-upper with an answer for every story." },
      { name: "Dooneese", description: "A tiny-handed singer in the Lawrence Welk Show sketches." }
    ]
  },
  {
    name: "Bill Hader",
    years: "2005–2013",
    totalSeasons: 8,
    characters: [
      { name: "Stefon", description: "A nightlife correspondent with unusual club recommendations." },
      { name: "Vinny Vedecci", description: "The host of a chaotic Italian television talk show." },
      { name: "Anthony Peter Coleman", description: "A recurring game-show host character." }
    ]
  },
  {
    name: "Kate McKinnon",
    years: "2012–2022",
    totalSeasons: 11,
    characters: [
      { name: "Olya Povlatsky", description: "A blunt correspondent from a remote Russian village." },
      { name: "Colleen Rafferty", description: "An alien-abduction survivor with increasingly strange stories." },
      { name: "Hillary Clinton", description: "One of her recurring political impressions." }
    ]
  },
  {
    name: "Cecily Strong",
    years: "2012–2022",
    totalSeasons: 11,
    characters: [
      { name: "Cathy Anne", description: "A sharp-tongued Weekend Update correspondent." },
      { name: "The Girl You Wish You Hadn't Started a Conversation with at a Party", description: "A loud, opinionated guest who takes over the conversation." },
      { name: "Jeanine Pirro", description: "A recurring impression of the television host and former judge." }
    ]
  }
];
