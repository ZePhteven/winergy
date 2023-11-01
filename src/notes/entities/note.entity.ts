import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BottleEntity } from '../../bottles/entities';

@Entity('note')
export class NoteEntity {
  /**
   * Entity's ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'bottle_id' })
  @ManyToOne(() => BottleEntity, (b) => b.id, { nullable: false, orphanedRowAction: 'delete' })
  @Column({ name: 'bottle_id' })
  bottleId: number;

  @Column({ name: 'expert_id' })
  expertId: number;

  @Column()
  note: number;

  /**
   * When this entity was created at
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * When this entity was last updated at
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
