import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class BottlePriceHistory1698922720873 implements MigrationInterface {
  private _maintable = new Table({
    name: 'bottle_price_history',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true, // Auto-increment
        generationStrategy: 'increment',
        isNullable: false,
      },
      {
        name: 'bottle_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'numeric',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private _foreignKey = new TableForeignKey({
    name: 'bottle_price_history',
    columnNames: ['bottle_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'bottle',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this._maintable, true);
    await queryRunner.createForeignKey(this._maintable, this._foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this._maintable, this._foreignKey);
    await queryRunner.dropTable(this._maintable, true);
  }
}
