/**
 * Dexie local storage DB setup file
 */

import Dexie from "dexie";
import { DB_NAME } from "./assets/constants";
import { Report } from "./assets/util";

// const getInfo = async () => {
//    const res = await Dexie.getDatabaseNames();
//    console.log(res);
// };
// getInfo();

class UserDatabase extends Dexie {
  reports!: Dexie.Table<Report, number>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      reports: "++id, qid, correct, subject_id, time",
    });
  }
}

export const db = new UserDatabase();
