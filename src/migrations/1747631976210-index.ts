import { MigrationInterface, QueryRunner } from "typeorm";

export class Index1747631976210 implements MigrationInterface {
    name = 'Index1747631976210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_f9926c1f7551cf35910192a7365\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_a8b6433d7d9cef5b106e076a93a\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_e48cb6acdfa46b27103250c784b\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`internId\` \`internId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`mentorId\` \`mentorId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`userId\` \`userId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_f9926c1f7551cf35910192a7365\` FOREIGN KEY (\`internId\`) REFERENCES \`intern\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_a8b6433d7d9cef5b106e076a93a\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_e48cb6acdfa46b27103250c784b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_e48cb6acdfa46b27103250c784b\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_a8b6433d7d9cef5b106e076a93a\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` DROP FOREIGN KEY \`FK_f9926c1f7551cf35910192a7365\``);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`userId\` \`userId\` bigint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`mentorId\` \`mentorId\` bigint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` CHANGE \`internId\` \`internId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_e48cb6acdfa46b27103250c784b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_a8b6433d7d9cef5b106e076a93a\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intern_ship_details\` ADD CONSTRAINT \`FK_f9926c1f7551cf35910192a7365\` FOREIGN KEY (\`internId\`) REFERENCES \`intern\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
