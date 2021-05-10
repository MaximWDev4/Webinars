import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserMigration1620670329714 implements MigrationInterface {
    name = 'CreateUserMigration1620670329714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `license` int NOT NULL DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
