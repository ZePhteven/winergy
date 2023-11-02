import { Injectable } from '@nestjs/common';

import {
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ObjectLiteral,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { BottleEntity } from 'src/bottles/entities';
import { getAverage, naiveRound } from 'src/shared/functions';

import { NoteEntity } from '../entities';

@Injectable()
@EventSubscriber()
export class NoteSubscriber implements EntitySubscriberInterface<NoteEntity> {
  listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
    return NoteEntity;
  }

  async afterInsert(event: InsertEvent<NoteEntity>): Promise<Promise<any> | void> {
    await updateAverageNote(event.manager, event.entity);
  }

  async afterUpdate(event: UpdateEvent<NoteEntity>): Promise<Promise<any> | void> {
    await updateAverageNote(event.manager, event.entity);
  }

  async afterRemove(event: RemoveEvent<NoteEntity>) {
    await updateAverageNote(event.manager, event.entity);
  }
}

async function updateAverageNote(manager: EntityManager, entity: NoteEntity | ObjectLiteral) {
  if (!entity) {
    return;
  }

  const notes = await manager.findBy(NoteEntity, { bottleId: entity.bottleId });
  const average = naiveRound(getAverage(notes.map((x) => x.note)), 2);
  manager.update(BottleEntity, { id: entity.bottleId }, { note: average });
}
