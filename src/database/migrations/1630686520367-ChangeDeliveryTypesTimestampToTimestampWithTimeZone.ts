import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeDeliveryTypesTimestampToTimestampWithTimeZone1630686520367
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN canceled_at TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN start_date TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN end_date TYPE TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN canceled_at TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN start_date TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE deliveries ALTER COLUMN end_date TYPE TIMESTAMP`,
    );
  }
}
