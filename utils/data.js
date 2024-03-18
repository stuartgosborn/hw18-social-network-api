const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  ``,
];

const descriptionsBodies = [
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "The unexamined life is not worth living. - Socrates",
  "Man is the measure of all things. - Protagoras",
  "Cogito, ergo sum. (I think, therefore I am.) - René Descartes",
  "To be is to be perceived. - George Berkeley",
  "God is dead. - Friedrich Nietzsche",
  "He who is unable to live in society, or who has no need because he is sufficient for himself, must be either a beast or a god. - Aristotle",
  "I think therefore I am. - René Descartes",
  "The meaning of life is to give life meaning. - Viktor Frankl",
  "The unexamined life is not worth living. - Socrates",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
  "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion. - Albert Camus"
];

const possibleReactions = [
  "Wow, that's deep!",
  "I never thought of it that way before.",
  "Interesting perspective!",
  "That's thought-provoking.",
  "I disagree with that.",
  "That resonates with me.",
  "It's hard to argue with that logic.",
  "I'm not sure I understand.",
  "That's a bit pessimistic.",
  "I find that inspiring.",
  "I'm conflicted about that.",
  "I can relate to that.",
  "I've always felt the same way.",
  "That's profound.",
  "That's a little out there.",
  "I'm not sure I agree.",
  "I need to think about that some more.",
  "That challenges my beliefs.",
  "I'm not sure I buy it.",
  "I'm blown away by that insight!"
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      published: Math.random() < 0.5,
      description: getRandomArrItem(descriptionsBodies),
      reactions: [...getThoughtReactions(3)],
    });
  }
  return results;
};

// Create the responses that will be added to each thought
const getThoughtReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getThoughtReactions };
