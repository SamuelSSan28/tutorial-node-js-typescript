import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUser1621206368817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"users",
            columns:[
                {
                    name:"id",
                    type:"INTEGER",
                    isPrimary:true,
                    generationStrategy:"increment",
                    isGenerated:true
                },
                {
                    name:"name",
                    type:"varchar"
                },
                {
                    name:"email",
                    type:"varchar"
                },
                {
                    name:"password",
                    type:"varchar"
                },
        ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }


}
