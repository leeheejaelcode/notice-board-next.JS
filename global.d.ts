// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      _mongo: Promise<MongoClient>;
    }
  }
}
export {};
