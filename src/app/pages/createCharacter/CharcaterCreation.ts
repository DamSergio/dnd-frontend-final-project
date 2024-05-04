export type Background = {
  name: string;
  description: string;
  benefits: string;
  icon?: string;
  proficiencies?: {
    languages?: string[];
    weapons?: string[];
    armor?: string[];
    skills?: string[];
  };
};

export type Aligment = {
  name: string;
  description: string;
};
