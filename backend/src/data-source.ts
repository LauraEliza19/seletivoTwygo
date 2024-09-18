//backend\src\data-source.ts
import { DataSource } from "typeorm";
import { Course } from "./entity/course";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "password",
  database: "coursesdb",
  synchronize: true,
  logging: true,
  entities: [Course],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
