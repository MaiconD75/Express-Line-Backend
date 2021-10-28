import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeNullableToTrueFromSomeProperties1635436297092
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('deliveries', [
      {
        oldColumn: new TableColumn({
          name: 'deliveryman_id',
          type: 'uuid',
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: 'deliveryman_id',
          type: 'uuid',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'origin_id',
          type: 'uuid',
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: 'origin_id',
          type: 'uuid',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'recipient_id',
          type: 'uuid',
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: 'recipient_id',
          type: 'uuid',
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('deliveries', [
      {
        oldColumn: new TableColumn({
          name: 'deliveryman_id',
          type: 'uuid',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'deliveryman_id',
          type: 'uuid',
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'origin_id',
          type: 'uuid',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'origin_id',
          type: 'uuid',
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'recipient_id',
          type: 'uuid',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'recipient_id',
          type: 'uuid',
          isNullable: false,
        }),
      },
    ]);
  }
}
