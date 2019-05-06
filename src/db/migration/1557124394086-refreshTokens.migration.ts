import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshTokens1557124394086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" character varying NOT NULL, "clientId" character varying NOT NULL, "scope" character varying NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD "redirectUri" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "redirectUri"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
