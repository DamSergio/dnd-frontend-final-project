import { Skill } from "./skills";

export type Class = {
  name: string;
  description: string;
  icon?: string;
  hitDice: number;
  hitPoints: number;
  hitPointsPerLevel: number;
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  savingThrows: string[];
  skills?: Skill[];
  items?: { name: string; quantity: number }[];
};

const Warlock: Class = {
  name: "Brujo",
  description:
    "Los brujos son lanzadores de conjuros que obtienen su poder mediante pactos con entidades sobrenaturales. Usan magia oscura y habilidades únicas otorgadas por estos pactos para influir en el mundo a su alrededor, y suelen enfrentarse a desafíos éticos y morales al tratar con seres oscuros en busca de poder y conocimiento.",
  icon: "/icons/classes/warlock.webp",
  hitDice: 8,
  hitPoints: 8,
  hitPointsPerLevel: 5,
  armorProficiencies: ["Armaduras ligeras"],
  weaponProficiencies: ["Armas simples"],
  toolProficiencies: [],
  savingThrows: ["Sabiduría", "Carisma"],
  skills: [],
  items: [
    { name: "Armadura de cuero", quantity: 1 },
    { name: "Daga", quantity: 2 },
    { name: "Ballesta ligera", quantity: 1 },
    { name: "Virotes", quantity: 20 },
  ],
};

const Cleric: Class = {
  name: "Clérigo",
  description:
    "Los clérigos son devotos de deidades o ideales, canalizando su fe en poder divino. Tienen acceso a conjuros de curación y habilidades para bendecir aliados y castigar enemigos. Además de ser sanadores, pueden servir como líderes espirituales y protectores de la fe, enfrentándose a las fuerzas del mal con su conexión divina.",
  icon: "/icons/classes/cleric.webp",
  hitDice: 8,
  hitPoints: 8,
  hitPointsPerLevel: 5,
  armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
  weaponProficiencies: ["Armas simples"],
  toolProficiencies: [],
  savingThrows: ["Sabiduría", "Carisma"],
  skills: [],
  items: [
    { name: "Escudo", quantity: 1 },
    { name: "Simbolo sagrado", quantity: 1 },
    { name: "Ballesta ligera", quantity: 1 },
    { name: "Virotes", quantity: 20 },
  ],
};

const Sorcecer: Class = {
  name: "Hechicero",
  description:
    "Los hechiceros son lanzadores de conjuros que obtienen su poder de su linaje o de pactos arcanos. Lanzan conjuros poderosos de manera espontánea y versátil, explorando los límites de su magia y desbloqueando nuevos poderes a medida que avanzan en su camino mágico",
  icon: "/icons/classes/sorcerer.webp",
  hitDice: 6,
  hitPoints: 6,
  hitPointsPerLevel: 4,
  armorProficiencies: [],
  weaponProficiencies: [
    "Dagas",
    "Dardos",
    "Hondas",
    "Bastones",
    "Ballestas ligeras",
  ],
  toolProficiencies: [],
  savingThrows: ["Constitución", "Carisma"],
  skills: [],
  items: [
    { name: "Daga", quantity: 2 },
    { name: "Ballesta ligera", quantity: 1 },
    { name: "Virotes", quantity: 20 },
  ],
};

const Fighter: Class = {
  name: "Guerrero",
  description:
    "Los guerreros son los pilares del combate, expertos en una amplia gama de armas y tácticas de guerra. Su habilidad en el campo de batalla, combinada con su valor y resistencia, los convierte en líderes naturales y en los protectores confiables de sus compañeros de equipo en cualquier aventura.",
  icon: "/icons/classes/fighter.webp",
  hitDice: 10,
  hitPoints: 10,
  hitPointsPerLevel: 6,
  armorProficiencies: [
    "Armaduras ligeras",
    "Armaduras medias",
    "Armaduras pesadas",
    "Escudos",
  ],
  weaponProficiencies: ["Armas simples", "Armas marciales"],
  toolProficiencies: [],
  savingThrows: ["Fuerza", "Constitución"],
  skills: [],
  items: [
    { name: "Armadura de cuero", quantity: 1 },
    { name: "Espada larga", quantity: 1 },
    { name: "Escudo", quantity: 1 },
    { name: "Ballesta ligera", quantity: 1 },
    { name: "Virotes", quantity: 20 },
  ],
};

export const Classes: Class[] = [Warlock, Cleric, Sorcecer, Fighter];
