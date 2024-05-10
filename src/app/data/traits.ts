export type Trait = {
  name: string;
  description: string;
};

const ExtraLenguage: Trait = {
  name: "Idioma extra",
  description: "Aprendes un idioma extra a tu elección.",
};

const DarkVision: Trait = {
  name: "Visión en la oscuridad",
  description: "Puedes ver en la oscuridad a una distancia de 60 pies.",
};

const SharpSenses: Trait = {
  name: "Sentidos Agudos",
  description: "Tienes ventaja en las tiradas de percepción.",
};

const Trance: Trait = {
  name: "Trance",
  description:
    "No necesitas dormir. En lugar de ello, meditas durante 4 horas al día.",
};

const FeyAncestry: Trait = {
  name: "Ascendencia Feérica",
  description:
    "Tienes ventaja en las tiradas de salvación contra ser encantado y no puedes ser puesto a dormir mágicamente.",
};

const ElvenWeaponTraining: Trait = {
  name: "Entrenamiento en Armas Élficas",
  description:
    "Tienes competencia con las espadas largas, espadas cortas, arcos largos y arcos cortos.",
};

const MagesTrick: Trait = {
  name: "Truco de mago a elección",
  description: "Puedes elegir un truco de mago adicional de tu elección.",
};

const ImprovedDarkVision: Trait = {
  name: "Visión en la Oscuridad Mejorada",
  description:
    "Tu visión en la oscuridad se extiende a una distancia de 120 pies.",
};

const SunlightSensitivity: Trait = {
  name: "Sensibilidad a la Luz del Sol",
  description:
    "Tienes desventaja en las tiradas de ataque y en las pruebas de Sabiduría (Percepción) que se basen en la vista cuando tú, el objetivo de tu ataque o lo que intentas percibir se encuentra en la luz del sol.",
};

const DrowWeaponTraining: Trait = {
  name: "Entrenamiento en Armas Drow",
  description:
    "Tienes competencia con las espadas cortas, las espadas largas y las ballestas de mano.",
};

const DwarvenResilience: Trait = {
  name: "Resistencia enana",
  description:
    "Tienes ventaja en las tiradas de salvación contra veneno y tienes resistencia contra veneno.",
};

const DwarvenCombatTraining: Trait = {
  name: "Entrenamiento de Combate Enano",
  description:
    "Tienes competencia con las hachas de mano, las hachas arrojadizas, los martillos ligeros y las mazas.",
};

const ToolProficiency: Trait = {
  name: "Competencia con Herramientas",
  description: "Tienes competencia con una herramienta de tu elección.",
};

const Stonecunning: Trait = {
  name: "Afinidad con la Piedra",
  description:
    "Cuando haces una tirada de Inteligencia (Historia) relacionada con la historia de la piedra, tienes ventaja en la tirada.",
};

const DwarvenToughness: Trait = {
  name: "Dureza Enana",
  description:
    "Tu punto de golpe máximo aumenta en 1, y aumenta en 1 cada vez que obtienes un nivel.",
};

const DwarvenArmorTraining: Trait = {
  name: "Entrenamiento con Armadura Enana",
  description: "Tienes competencia con las armaduras ligeras y medianas.",
};

const InfernalResistance: Trait = {
  name: "Resistencia Infernal",
  description: "Tienes resistencia al daño de fuego.",
};

const Menacing: Trait = {
  name: "Amenazante",
  description: "Tienes ventaja en las tiradas de intimidación.",
};

const RelentlessEndurance: Trait = {
  name: "Resistencia Incansable",
  description:
    "Cuando recibes daño que te dejaría con 0 puntos de golpe, en lugar de eso, te deja con 1 punto de golpe.",
};

const SavageAttacks: Trait = {
  name: "Ataques Salvajes",
  description:
    "Cuando haces un crítico con un ataque con arma cuerpo a cuerpo, puedes tirar un dado de daño adicional.",
};

const HumanTraits: Trait[] = [ExtraLenguage];

const ElfTraits: Trait[] = [DarkVision, SharpSenses, Trance, FeyAncestry];
const HighElfTraits: Trait[] = [ElvenWeaponTraining, ExtraLenguage, MagesTrick];
const WoodElfTraits: Trait[] = [ElvenWeaponTraining];
const DrowTraits: Trait[] = [
  ImprovedDarkVision,
  SunlightSensitivity,
  DrowWeaponTraining,
];

const DwarfTraits: Trait[] = [
  DarkVision,
  DwarvenResilience,
  DwarvenCombatTraining,
  ToolProficiency,
  Stonecunning,
];
const HillDwarfTraits: Trait[] = [DwarvenToughness];
const MountainDwarfTraits: Trait[] = [DwarvenArmorTraining];

const TieflingTraits: Trait[] = [DarkVision, InfernalResistance];

const HalfOrcTraits: Trait[] = [
  DarkVision,
  Menacing,
  RelentlessEndurance,
  SavageAttacks,
];

export const Traits = {
  HumanTraits,
  ElfTraits,
  HighElfTraits,
  WoodElfTraits,
  DrowTraits,
  DwarfTraits,
  HillDwarfTraits,
  MountainDwarfTraits,
  TieflingTraits,
  HalfOrcTraits,
};

export const TraitsList = [
  ExtraLenguage,
  DarkVision,
  SharpSenses,
  Trance,
  FeyAncestry,
  ElvenWeaponTraining,
  MagesTrick,
  ImprovedDarkVision,
  SunlightSensitivity,
  DrowWeaponTraining,
  DwarvenResilience,
  DwarvenCombatTraining,
  ToolProficiency,
  Stonecunning,
  DwarvenToughness,
  DwarvenArmorTraining,
  InfernalResistance,
  Menacing,
  RelentlessEndurance,
  SavageAttacks,
];
