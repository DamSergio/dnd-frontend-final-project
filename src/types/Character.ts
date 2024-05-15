export type NewCharacter = {
  name: string;
  age: number;
  gender: string;

  background: string;
  alignment: string;

  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  history: string;

  race: {
    name: string;
    icon: string;
    subRace?: string;
  };

  cls: {
    name: string;
    icon: string;
  };

  hitPoints: number;
  hitPointsBase: number;
  hitPointsPerLevel: number;
  armorClass: number;
  speed: number;
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];

  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };

  coins: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };

  skills: { name: string; description?: string }[];
  traits: { name: string; description?: string }[];
  items: { name: string; quantity: number }[];
  languages: string[];
};

export type Character = {
  name: string;
  age: number;
  gender: string;
  picture: string;

  background: string;
  alignment: string;

  personality_traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  history: string;

  character_race: {
    name: string;
    icon: string;
    subRace?: string;
  };

  character_class: {
    name: string;
    icon: string;
  };

  level: number;
  hit_points: number;
  hit_points_base: number;
  hit_points_per_level: number;
  armor_class: number;
  speed: number;
  saving_throws: string[];
  armor_proficiencies: string[];
  weapon_proficiencies: string[];
  tool_proficiencies: string[];

  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };

  coins: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };

  skills: { name: string; description?: string }[];
  traits: { name: string; description?: string }[];
  items: { name: string; quantity: number }[];
  languages: string[];

  abilities: string[];
  spells: string[];

  id: string;
  user: string;
};

export const defaultCharacter: Character = {
  name: "",
  age: 0,
  gender: "",
  picture: "",
  background: "",
  alignment: "",
  personality_traits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  history: "",
  character_race: {
    name: "",
    icon: "",
  },
  character_class: {
    name: "",
    icon: "",
  },
  level: 0,
  hit_points: 0,
  hit_points_base: 0,
  hit_points_per_level: 0,
  armor_class: 0,
  speed: 0,
  saving_throws: [],
  armor_proficiencies: [],
  weapon_proficiencies: [],
  tool_proficiencies: [],
  stats: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },
  coins: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  },
  skills: [],
  traits: [],
  items: [],
  languages: [],
  abilities: [],
  spells: [],
  id: "",
  user: "",
};
