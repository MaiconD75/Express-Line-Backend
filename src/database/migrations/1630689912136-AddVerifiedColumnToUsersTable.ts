import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddVerifiedColumnToUsersTable1630689912136
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'verified',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'verified');
  }
}
