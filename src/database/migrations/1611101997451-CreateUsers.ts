import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1611101997451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
          new Table({
              name: 'users',
              columns: [
                  {
                      name: 'id',
                      type: 'varchar',
                      isPrimary: true,
                      generationStrategy: 'uuid'
                  },
                  {
                      name: 'displayName',
                      type: 'varchar',
                      isNullable: false
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                  },
                  {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                  },
                  {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: "timezone('utc'::text, now())",
                    isNullable: false
                  },
                  {
                    name: 'role',
                    type: 'varchar',
                    isNullable: false
                  }
              ]
          })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users')
  }
}
