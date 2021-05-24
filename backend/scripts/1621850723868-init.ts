import {MigrationInterface, QueryRunner} from "typeorm";

export class init1621850723868 implements MigrationInterface {
    name = 'init1621850723868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `email_verification` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `emailToken` varchar(255) NOT NULL, `timestamp` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `chatroomId` int NOT NULL, `timestamp` int NOT NULL, `userName` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, PRIMARY KEY (`id`, `chatroomId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `licence` int NOT NULL DEFAULT '0', `email` varchar(255) NOT NULL, `emailVerified` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `webinar` (`id` int NOT NULL AUTO_INCREMENT, `chatroomId` int NOT NULL, `url` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `webinar`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `email_verification`");
    }

}
