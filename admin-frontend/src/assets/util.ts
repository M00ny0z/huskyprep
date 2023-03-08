/**
 * Re-used interfaces and utility functions
 */

// Interface for WIP Answers being created for a WIP Question
export interface TempAnswer {
  // The text to display for the TempAnswer
  text: string;
}

// Interface for WIP Questions
export interface TempQuestion {
  // Unique ID for the question
  id?: number;
  // Main-Body text to display for the question
  text: string;
  // List of possible answers to show for the question
  answers: TempAnswer[];
  // The index of the correct possible answer
  correct_idx: number;
  // The id of the subject the question belongs to
  subject_id: number;
}

/**
 * Retrieves the capitalized letter given an index
 * @param {number} idx - The index of the letter to get, starting from 0
 * @return {string} - The letter given the index, 0 for A, 1 for B, etc.
 */
export const getLetterFromIdx = (idx: number): string => {
  return String.fromCharCode(idx + 65);
};
