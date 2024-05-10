export type Alignment = {
  name: string;
  description: string;
};

const LawfulGood = {
  name: "Legal Bueno",
  description:
    "Un buen personaje legal es un protector del honor y la verdad. Pasa su vida castigando y denunciando todas las injusticias que se encuentra en su camino sin ninguna vacilación o temor.",
};

const NeutralGood = {
  name: "Neutral Bueno",
  description:
    "Un buen personaje neutral cree en el altruismo por encima de todo y siempre ayudará a los demás, aunque nunca sienta la necesidad ni la obligación de hacerlo.",
};

const ChaoticGood = {
  name: "Caótico Bueno",
  description:
    "Un buen personaje caótico cree en la libertad como la mayor virtud sin preocuparse de lo que puedan opinar de él los demás. Hará un balance y examinará lo que es bueno y lo ejecutará sin que esto sea precisamente bueno para la sociedad en general.",
};

const LawfulNeutral = {
  name: "Legal Neutral",
  description:
    "Un personaje legal y neutral obedece a los principios y leyes creadas por sí mismo o siguiendo un orden creado por un gobierno.",
};

const TrueNeutral = {
  name: "Neutral",
  description:
    "Un verdadero personaje neutral es neutral en ambos ejes, y no le importa ninguna postura de alineación. Esto a menudo describe a alguien que sólo se preocupa por sus propias necesidades personales, no inclinado a herir o dañar a otros, ni a obedecer o rebelarse.",
};

const ChaoticNeutral = {
  name: "Caótico Neutral",
  description:
    "Un caótico neutral sigue su corazón, pero sin la voluntad de autosacrificio como podría hacerlo un caótico-bueno.",
};

const LawfulEvil = {
  name: "Legal Malvado",
  description:
    "Un personaje con esta alineación es un tirano. No tiene reparos morales en castigar a los individuos por el gran objetivo de promover la sociedad, preocupado por la lealtad, la tradición y el orden. Un villano con este alineamiento es a menudo fácil de tratar, ya que generalmente puedes confiar en que mantendrá su palabra.",
};

const NeutralEvil = {
  name: "Neutral Malvado",
  description:
    "Este tipo de personajes lo podemos catalogar como egoísta, y no tiene problemas en dañar a otros para conseguir lo que quieren y te traicionará deliberadamente si con eso pueden salirse con la suya.",
};

const ChaoticEvil = {
  name: "Caótico Malvado",
  description:
    "Un personaje malévolo, un villano empeñado en sembrar la destrucción. El odio y la codicia le obligan a destruir, asesinar con el objetivo de crear más caos en su entorno.",
};

export const Alignments: Alignment[] = [
  LawfulGood,
  NeutralGood,
  ChaoticGood,
  LawfulNeutral,
  TrueNeutral,
  ChaoticNeutral,
  LawfulEvil,
  NeutralEvil,
  ChaoticEvil,
];
