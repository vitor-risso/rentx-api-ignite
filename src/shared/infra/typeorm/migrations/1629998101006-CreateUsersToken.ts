import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1629998101006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:"users_token",
          columns:[
            {
              name: "id",
              type:"uuid",
              isPrimary: true
            },
            {
              name:"refrash_tokne",
              type:"varchar"
            },
            {
              name:"user_id",
              type:"uuid"
            },
            {
              name:"expire_date",
              type:"timestamp"
            },
            {
              name:"created_at",
              type:"timestamp",
              default:"now()"
            }
          ],
          foreignKeys:[
            {
              name:"FKUserToken",
              referencedTableName:"users",
              referencedColumnNames:["id"],
              columnNames:[
                "user_id"
              ],
              onDelete:"CASCADE",
              onUpdate:"CASCADE"
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users_token")
    }

}
