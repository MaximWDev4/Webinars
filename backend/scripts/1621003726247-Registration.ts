import {MigrationInterface, QueryRunner} from "typeorm";

export class Registration1621003726247 implements MigrationInterface {
    name = 'Registration1621003726247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `refresh_token` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `refresh_token`");
    }

}
