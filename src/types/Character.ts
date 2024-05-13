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
