import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeLicenceType1620923881827 implements MigrationInterface {
    name = 'ChangeLicenceType1620923881827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `license` `licence` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `licence` `license` int NOT NULL DEFAULT '0'");
    }

}
