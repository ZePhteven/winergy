import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Bottle1698785139434 implements MigrationInterface {
  private _maintable = new Table({
    name: 'bottle',
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
        name: 'type',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'numeric',
        isNullable: false,
      },
      {
        name: 'producer_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'retailer_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'year',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private _linktable = new Table({
    name: 'note',
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
        name: 'expert_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'note',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private _foreignKey = new TableForeignKey({
    name: 'note_bottle',
    columnNames: ['bottle_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'bottle',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this._maintable, true);
    await queryRunner.createTable(this._linktable, true);
    await queryRunner.createForeignKey(this._linktable, this._foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this._linktable, this._foreignKey);
    await queryRunner.dropTable(this._linktable, true);
    await queryRunner.dropTable(this._maintable, true);
  }
}
