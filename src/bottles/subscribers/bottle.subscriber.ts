import { Injectable } from '@nestjs/common';

import {
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ObjectLiteral,
  UpdateEvent,
} from 'typeorm';

import { BottleEntity } from 'src/bottles/entities';

import { BottlePriceHistoryEntity } from '../entities';

@Injectable()
@EventSubscriber()
export class BottleSubscriber implements EntitySubscriberInterface<BottleEntity> {
  listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
    return BottleEntity;
  }

  async afterInsert(event: InsertEvent<BottleEntity>): Promise<Promise<any> | void> {
    await handleHistory(event.manager, event.entity);
  }

  async afterUpdate(event: UpdateEvent<BottleEntity>): Promise<Promise<any> | void> {
    await handleHistory(event.manager, event.entity);
  }
}

async function handleHistory(manager: EntityManager, entity: BottleEntity | ObjectLiteral) {
  if (!entity) {
    return;
  }

  const history = manager.create(BottlePriceHistoryEntity);

  history.bottleId = entity.id;
  history.price = entity.price;

  await manager.save(history);
}
