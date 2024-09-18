"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
//backend\src\data-source.ts
const typeorm_1 = require("typeorm");
const course_1 = require("./entity/course");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "coursesdb",
    synchronize: true,
    logging: true,
    entities: [course_1.Course],
    subscribers: [],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
