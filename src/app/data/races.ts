import { DwarfSubRaces, ElfSubRaces, SubRace } from "./subRaces";
import { Trait, Traits } from "./traits";

export type Race = {
  name: string;
  description: string;
  icon?: string;
  stats?: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  speed: number;
  lenguages: string[];
  traits?: Trait[];
  subRace?: SubRace[];
};

const Human: Race = {
  name: "Humano",
  description:
    "Los humanos son la raza más común y adaptable entre las razas de D&D. Son conocidos por su ambición y su capacidad para lograr lo que se proponen. Los humanos son conocidos por su capacidad para adaptarse a cualquier entorno y por su capacidad para sobrevivir en cualquier situación.",
  icon: "/icons/races/human.png",
  stats: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
  speed: 30,
  lenguages: ["Común"],
  traits: Traits.HumanTraits,
};

const Elf: Race = {
  name: "Elfo",
  icon: "/icons/races/elf.png",
  description:
    "Los elfos son una raza de seres humanoides que son conocidos por su destreza y agilidad. Son conocidos por su habilidad para moverse rápidamente y por su capacidad para esquivar ataques. Los elfos son conocidos por su habilidad para usar la magia y por su capacidad para comunicarse con los animales.",
  stats: { dex: 2 },
  speed: 30,
  lenguages: ["Común", "Élfico"],
  traits: Traits.ElfTraits,
  subRace: ElfSubRaces,
};

const Dwarf: Race = {
  name: "Enano",
  icon: "/icons/races/dwarf.png",
  description:
    "Los enanos en D&D son una raza resistente y robusta, conocida por su habilidad en la artesanía y su ferocidad en combate. Son hábiles en la minería y la metalurgia, y suelen vivir en ciudades subterráneas y fortalezas en las montañas. A menudo son leales y honorables, pero también pueden ser tercos y rencorosos.",
  stats: { con: 2 },
  speed: 25,
  lenguages: ["Común", "Enano"],
  traits: Traits.DwarfTraits,
  subRace: DwarfSubRaces,
};

const Tiefling: Race = {
  name: "Tiflin",
  icon: "/icons/races/tiefling.png",
  description:
    "Los tieflings en D&D son seres con sangre infernal, lo que les otorga rasgos demoníacos como cuernos, colas y ojos inusuales. A menudo son desconfiados y temidos por su apariencia, pero también pueden ser astutos y carismáticos. Algunos tieflings luchan contra su herencia infernal, mientras que otros la abrazan y la utilizan para obtener poder.",
  stats: { cha: 2, int: 1 },
  speed: 30,
  lenguages: ["Común", "Infernal"],
  traits: Traits.TieflingTraits,
};

const HalfOrc: Race = {
  name: "Semiorco",
  icon: "/icons/races/half-orc.png",
  description:
    "Híbridos entre humanos y orcos, los semiorcos poseen una combinación única de fuerza, tenacidad y adaptabilidad. A menudo se enfrentan a la marginación y la desconfianza debido a su apariencia y reputación, pero muchos encuentran su camino como aventureros o líderes en sus comunidades.",
  stats: { str: 2, con: 1 },
  speed: 30,
  lenguages: ["Común", "Orco"],
  traits: Traits.HalfOrcTraits,
};

export const Races = [Human, Elf, Dwarf, Tiefling, HalfOrc];
