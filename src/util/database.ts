// MongoDB 클라이언트를 임포트합니다.
import { MongoClient } from "mongodb";

// MongoDB 연결 URL과 옵션을 설정합니다.
const url =
  "mongodb+srv://leeheejaelcode:admin1234@cluster0.ftngm.mongodb.net/?retryWrites=true&w=majority"; // 연결할 MongoDB의 클러스터 URL

// MongoClient 연결을 관리할 변수를 선언합니다. Promise 객체를 사용해 비동기적으로 연결을 관리합니다.
let connectDB: Promise<MongoClient>;

// 개발 환경인 경우 MongoDB 연결을 전역(global)으로 캐싱하여 여러 번 연결하지 않도록 합니다.
if (process.env.NODE_ENV === "development") {
  // 전역 객체에 _mongo가 존재하지 않으면 MongoDB에 새로 연결하고, 있으면 기존 연결을 재사용합니다.
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect(); // MongoDB에 연결
  }
  connectDB = global._mongo; // 전역에 저장된 MongoDB 연결을 할당합니다.
} else {
  // 개발 환경이 아닌 경우 매번 새로 MongoClient를 생성하여 연결합니다.
  connectDB = new MongoClient(url).connect();
}

// connectDB 변수를 내보내서 다른 모듈에서 사용할 수 있게 합니다.
export { connectDB };
