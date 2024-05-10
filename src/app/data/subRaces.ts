import { Trait, Traits } from "./traits";

export type SubRace = {
  name: string;
  description: string;
  stats?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  speed: number;
  traits?: Trait[];
};

// Elf SubRaces
const HighElf: SubRace = {
  name: "Alto Elfo",
  description:
    "Los elfos altos son conocidos por su inteligencia y su capacidad para aprender rápidamente. Son conocidos por su habilidad para usar la magia y por su capacidad para comunicarse con los animales.",
  stats: { int: 1 },
  speed: 30,
  traits: Traits.HighElfTraits,
};

const WoodElf: SubRace = {
  name: "Elfo de los Bosques",
  description:
    "Los elfos de los bosques son conocidos por su destreza y su capacidad para moverse rápidamente. Son conocidos por su habilidad para esquivar ataques y por su capacidad para usar la magia.",
  stats: { wis: 1 },
  speed: 35,
  traits: Traits.WoodElfTraits,
};

const Drow: SubRace = {
  name: "Elfo Oscuro",
  description:
    "Los elfos oscuros son conocidos por su destreza y su capacidad para moverse rápidamente. Son conocidos por su habilidad para esquivar ataques y por su capacidad para usar la magia.",
  stats: { cha: 1 },
  speed: 30,
  traits: Traits.DrowTraits,
};

export const ElfSubRaces = [HighElf, WoodElf, Drow];

// Dwarf SubRaces
const HillDwarf: SubRace = {
  name: "Enano de las Colinas",
  description:
    "Los enanos de las colinas son enanos más orientados hacia la comunidad y la agricultura. Son conocidos por su hospitalidad y su amor por la buena comida y la bebida. A menudo son expertos en la artesanía y la agricultura, y valoran la paz y la estabilidad en su vida cotidiana.",
  stats: { wis: 1 },
  speed: 25,
  traits: Traits.HillDwarfTraits,
};

const MountainDwarf: SubRace = {
  name: "Enano de las Montañas",
  description:
    "Los enanos de las montañas son más duros y guerreros que sus parientes de las colinas. Son expertos en la minería y la metalurgia, y se enorgullecen de su habilidad en el combate. Son conocidos por su tenacidad y su lealtad, y a menudo viven en ciudades fortificadas en las montañas, defendiendo sus hogares contra amenazas externas.",
  stats: { str: 2 },
  speed: 25,
  traits: Traits.MountainDwarfTraits,
};

export const DwarfSubRaces = [HillDwarf, MountainDwarf];
