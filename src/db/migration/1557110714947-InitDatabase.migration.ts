import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1557110714947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "access_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" character varying, "clientId" character varying NOT NULL, CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authorization_code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "clientId" character varying NOT NULL, "redirectUri" character varying NOT NULL, "userId" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "PK_586233caf7e281dc24aaedd1335" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "clientId" character varying NOT NULL, "clientSecret" character varying NOT NULL, "isTrusted" boolean NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "authorization_code"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
    }

}
