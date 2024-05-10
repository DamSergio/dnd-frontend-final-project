import {
  Skill,
  AcolyteSkills,
  GuildArtisanSkills,
  CriminalSkills,
  SoldierSkills,
} from "./skills";

export type Background = {
  name: string;
  icon: string;
  description: string;
  benefits: string;
  proficiencies: {
    skills: Skill[];
    languages?: number;
    items?: { name: string; quantity: number }[];
    coins?: {
      cp?: number;
      sp?: number;
      ep?: number;
      gp?: number;
      pp?: number;
    };
  };
};

const Acolyte: Background = {
  name: "Acolito",
  icon: "/icons/backgrounds/acolyte.png",
  description:
    "Servir en un templo, realizar rituales, sacrificios, eras un sacerdote… ¿Clérigo?",
  benefits:
    "Perspicacia, Religión, dos idiomas a elegir, equipo de sacerdote, rasgo Refugio del Fiel.",
  proficiencies: {
    skills: AcolyteSkills,
    languages: 2,
    items: [
      { name: "Simbolo sagrado", quantity: 1 },
      { name: "Barra de incienso", quantity: 5 },
      { name: "Vestiduras", quantity: 1 },
      { name: "Conjunto de ropa comun", quantity: 1 },
    ],
    coins: { gp: 15 },
  },
};

const GuildArtisan: Background = {
  name: "Artesano Gremial",
  icon: "/icons/backgrounds/guild-artisan.png",
  description: "Pertenecer a un gremio, deberá elegir a cual… ¿Brujo?",
  benefits:
    "Perspicacia, Persuasión, Herramientas de artesano, un idioma a elegir, Equipo de artesano, rasgo Miembro de un gremio.",
  proficiencies: {
    skills: GuildArtisanSkills,
    languages: 1,
    items: [
      { name: "Herramientas de Artesano", quantity: 1 },
      { name: "Carta de introduccion de tu gremio", quantity: 1 },
      { name: "Muda de ropa de viaje", quantity: 1 },
    ],
    coins: { gp: 15 },
  },
};

const Criminal: Background = {
  name: "Criminal",
  icon: "/icons/backgrounds/criminal.png",
  description:
    "Experto en criminalidad, asesinar, violencia y sentirse al margen de la ley. ¿Hechicero?",
  benefits:
    "Engaño, sigilo, Herramientas de ladrón, útiles para el ladrón. rasgo Contacto Criminal.",
  proficiencies: {
    skills: CriminalSkills,
    items: [
      { name: "Barreta", quantity: 1 },
      { name: "Conjunto de ropa comun oscura", quantity: 1 },
      { name: "Capucha", quantity: 1 },
    ],
    coins: { gp: 15 },
  },
};

const Soldier: Background = {
  name: "Soldado",
  icon: "/icons/backgrounds/soldier.png",
  description: "Perteneciente a un ejercito… ¿Guerrero?",
  benefits:
    "Atletismo, intimidación, competencia en juego y vehículos, equipo de soldado, rasgo Rango Militar.",
  proficiencies: {
    skills: SoldierSkills,
    items: [
      { name: "Insignia militar", quantity: 1 },
      { name: "Muda de ropa comun", quantity: 1 },
    ],
    coins: { gp: 10 },
  },
};

export const Backgrounds = [Acolyte, GuildArtisan, Criminal, Soldier];
