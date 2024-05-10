export type Skill = {
  name: string;
  description: string;
};

const Insight: Skill = {
  name: "Perspicacia",
  description: "Determinar la verdadera intención de una criatura.",
};

const Religion: Skill = {
  name: "Religión",
  description: "Conocimiento de los dioses y los rituales.",
};

const Persuasion: Skill = {
  name: "Persuasión",
  description: "Convencer a otros de que hagan lo que tú quieres.",
};

const Deception: Skill = {
  name: "Engaño",
  description: "Mentir, ocultar la verdad y engañar a otros.",
};

const Stealth: Skill = {
  name: "Sigilo",
  description: "Moverte sin ser detectado.",
};

const Atlethics: Skill = {
  name: "Atletismo",
  description: "Realizar proezas físicas.",
};

const Intimidation: Skill = {
  name: "Intimidación",
  description: "Infligir miedo en otros.",
};

const Arcana: Skill = {
  name: "Conocimiento Arcano",
  description: "Conocimiento de la magia y los planos.",
};

const History: Skill = {
  name: "Historia",
  description: "Conocimiento de eventos pasados.",
};

const Investigation: Skill = {
  name: "Investigación",
  description: "Resolver misterios y encontrar pistas.",
};

const Nature: Skill = {
  name: "Naturaleza",
  description: "Conocimiento de la flora y fauna.",
};

const Medicine: Skill = {
  name: "Medicina",
  description: "Curar heridas y enfermedades.",
};

const Acrobatics: Skill = {
  name: "Acrobacias",
  description: "Realizar movimientos acrobáticos.",
};

const AnimalHandling: Skill = {
  name: "Trato con Animales",
  description: "Interactuar con animales.",
};

const Performance: Skill = {
  name: "Interpretacion",
  description: "Realizar actuaciones artísticas.",
};

const Survival: Skill = {
  name: "Supervivencia",
  description: "Sobrevivir en la naturaleza.",
};

const SlightOfHand: Skill = {
  name: "Juego de Manos",
  description: "Realizar trucos de manos.",
};

const Perception: Skill = {
  name: "Percepción",
  description: "Notar cosas que otros no pueden.",
};

// BACKGROUND SKILLS
export const AcolyteSkills: Skill[] = [Insight, Religion];
export const GuildArtisanSkills: Skill[] = [Insight, Persuasion];
export const CriminalSkills: Skill[] = [Deception, Stealth];
export const SoldierSkills: Skill[] = [Atlethics, Intimidation];

// ALL SKILLS
export const Skills: Skill[] = [
  Insight,
  Religion,
  Persuasion,
  Deception,
  Stealth,
  Atlethics,
  Intimidation,
  Arcana,
  History,
  Investigation,
  Nature,
  Medicine,
  Acrobatics,
  AnimalHandling,
  Performance,
  Survival,
  SlightOfHand,
  Perception,
];
