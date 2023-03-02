export const ATOMS = "Atoms, Molecules, & Ions";
export const QUANTUM = "Quantum Mechanics & Atomic Theory";
export const BONDING = "Bonding: General Concepts";
export const STOICHIOMETRY = "Stoichiometry";
export const REACTIONS = "Types of Chemical Reactions & Solution Stoichiometry";
export const KINETICS = "Chemical Kinetics";
export const GASES = "Gases";

export const QUESTION_MODE = "QUESTION_MODE";
export const CARDS_MODE = "CARDS_MODE";

export const SUBJECTS_IDX = [
  ATOMS,
  QUANTUM,
  BONDING,
  STOICHIOMETRY,
  REACTIONS,
  KINETICS,
  GASES,
];

export interface SubjectProps {
  readonly name: string;
  readonly chapter: string;
  readonly idx: number;
}

export enum SubjectsEnum {
  Atoms,
  Quantum,
  Bonding,
  Stoichiometry,
  Reactions,
  Kinetics,
  Gases,
}

export enum SubjectChapters {
  Atoms = "Chapter 2",
  Quantum = "Chapter 12",
  Bonding = "Chapter 13"
}

export const SUBJECTS: { [name: string]: SubjectProps } = {
  ATOMS: {
    chapter: "Chapter 2",
    name: ATOMS,
    idx: 0,
  },
  QUANTUM: {
    chapter: "Chapter 12",
    name: QUANTUM,
    idx: 1,
  },
  BONDING: {
    chapter: "Chapter 13",
    name: BONDING,
    idx: 2,
  },
  STOICHIOMETRY: {
    chapter: "Chapter 3",
    name: STOICHIOMETRY,
    idx: 3,
  },
  REACTIONS: {
    chapter: "Chapter 4",
    name: REACTIONS,
    idx: 4,
  },
  KINETICS: {
    chapter: "Chapter 15",
    name: KINETICS,
    idx: 5,
  },
  GASES: {
    chapter: "Chapter 5",
    name: GASES,
    idx: 6,
  },
};

export const COLORS = {
  ATOMS: "Primary",
  QUANTUM: "Success",
  BONDING: "Danger",
  STOICHIOMETRY: "Warning",
  REACTIONS: "Info",
  KINETICS: "Light",
  GASES: "Dark",
};

export const LETTERS = ["A", "B", "C", "D", "E"];

export const PIE_SETTINGS = {
  labels: SUBJECTS_IDX,
  backgroundColor: [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(245, 39, 236, 0.5)",
  ],
  borderColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(245, 39, 236, 1)",
  ],
};
