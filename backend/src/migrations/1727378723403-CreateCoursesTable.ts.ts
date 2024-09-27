import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCourseTable1695692337123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "course",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "startDate",
                        type: "date",
                    },
                    {
                        name: "endDate",
                        type: "date",
                    },
                    {
                        name: "videos",
                        type: "text",
                        isArray: true, // Define como array
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("course");
    }
}
