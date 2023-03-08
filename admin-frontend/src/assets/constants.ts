/**
 * Contains constant values for the entire project
 */

export const QUESTION_MODE = "QUESTION_MODE";
export const CARDS_MODE = "CARDS_MODE";

export const DB_NAME = "AdminTempQuestionDatabase";

export const RADIX = 10;

export const SUBJECTS = {
  ATOMS: {
    chapter: "Chapter 2",
    title: "Atoms, Molecules, & Ions",
    idx: 0,
    color: "Primary",
  },
  QUANTUM: {
    chapter: "Chapter 12",
    title: "Quantum Mechanics & Atomic Theory",
    idx: 1,
    color: "Success",
  },
  BONDING: {
    chapter: "Chapter 13",
    title: "Bonding: General Concepts",
    idx: 2,
    color: "Danger",
  },
  STOICHIOMETRY: {
    chapter: "Chapter 3",
    title: "Stoichiometry",
    idx: 3,
    color: "Warning",
  },
  REACTIONS: {
    chapter: "Chapter 4",
    title: "Types of Chemical Reactions & Solution Stoichiometry",
    idx: 4,
    color: "Info",
  },
  KINETICS: {
    chapter: "Chapter 15",
    title: "Chemical Kinetics",
    idx: 5,
    color: "Light",
  },
  GASES: {
    chapter: "Chapter 5",
    title: "Gases",
    idx: 6,
    color: "Dark",
  },
} as const;
export type Subject = keyof typeof SUBJECTS;

export const SUBJECT_LABELS: string[] = Object.entries(SUBJECTS).map(
  ([, subject]) => subject.title
);

export const COLORS = {
  ATOMS: "Primary",
  QUANTUM: "Success",
  BONDING: "Danger",
  STOICHIOMETRY: "Warning",
  REACTIONS: "Info",
  KINETICS: "Light",
  GASES: "Dark",
};

export const PIE_SETTINGS = {
  labels: SUBJECT_LABELS,
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
