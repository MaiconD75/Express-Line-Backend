import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDelivery1612447437009 implements MigrationInterface {
  private readonly deliveryUserTableForeingKey = new TableForeignKey({
    name: 'DeliveryUser',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  private readonly deliveryDeliverymanTableForeingKey = new TableForeignKey({
    name: 'DeliveryDeliveryman',
    columnNames: ['deliveryman_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'deliverymen',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  private readonly deliveryRecipientTableForeingKey = new TableForeignKey({
    name: 'DeliveryRecipient',
    columnNames: ['recipient_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'recipients',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  private readonly deliveryOriginTableForeingKey = new TableForeignKey({
    name: 'DeliveryOrigin',
    columnNames: ['origin_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'origins',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'deliveryman_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'origin_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'recipient_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'signature',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('deliveries', [
      this.deliveryUserTableForeingKey,
      this.deliveryDeliverymanTableForeingKey,
      this.deliveryRecipientTableForeingKey,
      this.deliveryOriginTableForeingKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('deliveries', [
      this.deliveryUserTableForeingKey,
      this.deliveryDeliverymanTableForeingKey,
      this.deliveryRecipientTableForeingKey,
      this.deliveryOriginTableForeingKey,
    ]);

    await queryRunner.dropTable('deliveries');
  }
}
