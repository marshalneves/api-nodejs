import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePosts1611103048135 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "userId",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "amount",
            type: "real",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "date",
            type: "timestamp with time zone",
            isNullable: false,
          },
          {
            name: "dc",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "timezone('utc'::text, now())",
            isNullable: false,
          },
          {
            name: "deleted_at",
            type: "timestamp with time zone",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}