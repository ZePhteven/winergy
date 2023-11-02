import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class BottleNote1698913785528 implements MigrationInterface {
  private _bottleNoteColumn = new TableColumn({
    name: 'note',
    type: 'numeric',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('bottle', this._bottleNoteColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bottle', this._bottleNoteColumn);
  }
}
