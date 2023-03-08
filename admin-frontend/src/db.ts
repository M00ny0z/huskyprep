import Dexie from "dexie";
import { DB_NAME } from "./assets/constants";
import { TempQuestion } from "./assets/util";

class AdminTempQuestionDatabase extends Dexie {
  questions!: Dexie.Table<TempQuestion, number>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      questions: "++id, text, answers, correct_idx, subject_id",
    });
  }
}

export const db = new AdminTempQuestionDatabase();
