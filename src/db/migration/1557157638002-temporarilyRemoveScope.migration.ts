import { MigrationInterface, QueryRunner } from 'typeorm';

export class temporarilyRemoveScope1557157638002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "scope"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "scope" character varying NOT NULL`);
    }

}
