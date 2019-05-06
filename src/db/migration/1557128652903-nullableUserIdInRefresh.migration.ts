import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullableUserIdInRefresh1557128652903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "userId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "userId" SET NOT NULL`);
    }

}
