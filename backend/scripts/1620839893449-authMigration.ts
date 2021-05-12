import {MigrationInterface, QueryRunner} from "typeorm";

export class authMigration1620839893449 implements MigrationInterface {
    name = 'authMigration1620839893449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `email_verification` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `emailToken` varchar(255) NOT NULL, `timestamp` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `chatroomId` int NOT NULL, `timestamp` int NOT NULL, `userName` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, PRIMARY KEY (`id`, `chatroomId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `webinar` (`id` int NOT NULL AUTO_INCREMENT, `chatroomId` int NOT NULL, `url` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `emailVerified` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `emailVerified`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`");
        await queryRunner.query("DROP TABLE `webinar`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `email_verification`");
    }

}
